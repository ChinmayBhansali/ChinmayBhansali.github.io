/* ============================================
   Blog — Comments System (localStorage-based)
   ============================================ */

(function () {
    'use strict';

    // Admin mode: append ?admin=true to URL to enable delete buttons
    const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';

    // Get post ID from current page URL
    function getPostId() {
        const path = window.location.pathname;
        const match = path.match(/blog-(.+)\.html/);
        return match ? match[1] : 'default';
    }

    // Get comments from localStorage
    function getComments(postId) {
        const key = `blog_comments_${postId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    // Save comments to localStorage
    function saveComments(postId, comments) {
        const key = `blog_comments_${postId}`;
        localStorage.setItem(key, JSON.stringify(comments));
    }

    // Generate initials from name
    function getInitials(name) {
        return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    }

    // Format date
    function formatDate(dateStr) {
        const d = new Date(dateStr);
        const now = new Date();
        const diff = now - d;
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // Render a single comment HTML
    function renderComment(comment) {
        const repliesHtml = (comment.replies || []).map((reply, replyIdx) => `
            <div class="comment">
                <div class="comment__header">
                    <div class="comment__avatar">${getInitials(reply.name)}</div>
                    <span class="comment__name">${escapeHtml(reply.name)}</span>
                    <span class="comment__date">${formatDate(reply.date)}</span>
                    ${isAdmin ? `<button class="comment__delete-btn" onclick="deleteReply('${comment.id}', ${replyIdx})" title="Delete reply">🗑</button>` : ''}
                </div>
                <p class="comment__body">${escapeHtml(reply.text)}</p>
            </div>
        `).join('');

        return `
            <li class="comment" data-id="${comment.id}">
                <div class="comment__header">
                    <div class="comment__avatar">${getInitials(comment.name)}</div>
                    <span class="comment__name">${escapeHtml(comment.name)}</span>
                    <span class="comment__date">${formatDate(comment.date)}</span>
                    ${isAdmin ? `<button class="comment__delete-btn" onclick="deleteComment('${comment.id}')" title="Delete comment">🗑</button>` : ''}
                </div>
                <p class="comment__body">${escapeHtml(comment.text)}</p>
                <button class="comment__reply-btn" onclick="toggleReplyForm('${comment.id}')">Reply</button>
                <div class="reply-form" id="reply-form-${comment.id}">
                    <div class="comment-form__row">
                        <input type="text" class="comment-form__input" placeholder="Your name" id="reply-name-${comment.id}">
                    </div>
                    <div class="comment-form__row">
                        <textarea class="comment-form__textarea" placeholder="Write a reply..." id="reply-text-${comment.id}"></textarea>
                    </div>
                    <button class="comment-form__submit" onclick="submitReply('${comment.id}')">Post Reply</button>
                </div>
                ${repliesHtml ? `<div class="comment__replies">${repliesHtml}</div>` : ''}
            </li>
        `;
    }

    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Render all comments
    function renderComments() {
        const postId = getPostId();
        const comments = getComments(postId);
        const thread = document.getElementById('commentThread');
        const countEl = document.getElementById('commentCount');

        if (!thread) return;

        const total = comments.reduce((sum, c) => sum + 1 + (c.replies || []).length, 0);
        if (countEl) countEl.textContent = `${total} comment${total !== 1 ? 's' : ''}`;

        if (comments.length === 0) {
            thread.innerHTML = '<li class="comments-empty">No comments yet. Be the first to share your thoughts!</li>';
            return;
        }

        thread.innerHTML = comments.map(renderComment).join('');
    }

    // Submit a new comment
    window.submitComment = function () {
        const nameInput = document.getElementById('commentName');
        const textInput = document.getElementById('commentText');

        const name = nameInput.value.trim();
        const text = textInput.value.trim();

        if (!name || !text) {
            alert('Please enter both your name and a comment.');
            return;
        }

        const postId = getPostId();
        const comments = getComments(postId);

        comments.unshift({
            id: 'c_' + Date.now(),
            name: name,
            text: text,
            date: new Date().toISOString(),
            replies: []
        });

        saveComments(postId, comments);
        nameInput.value = '';
        textInput.value = '';
        renderComments();
    };

    // Toggle reply form
    window.toggleReplyForm = function (commentId) {
        const form = document.getElementById(`reply-form-${commentId}`);
        if (form) {
            form.classList.toggle('active');
        }
    };

    // Submit a reply
    window.submitReply = function (commentId) {
        const nameInput = document.getElementById(`reply-name-${commentId}`);
        const textInput = document.getElementById(`reply-text-${commentId}`);

        const name = nameInput.value.trim();
        const text = textInput.value.trim();

        if (!name || !text) {
            alert('Please enter both your name and a reply.');
            return;
        }

        const postId = getPostId();
        const comments = getComments(postId);
        const comment = comments.find(c => c.id === commentId);

        if (comment) {
            if (!comment.replies) comment.replies = [];
            comment.replies.push({
                name: name,
                text: text,
                date: new Date().toISOString()
            });
            saveComments(postId, comments);
            renderComments();
        }
    };

    // Delete a comment (admin only)
    window.deleteComment = function (commentId) {
        if (!confirm('Delete this comment and all its replies?')) return;
        const postId = getPostId();
        const comments = getComments(postId);
        const filtered = comments.filter(c => c.id !== commentId);
        saveComments(postId, filtered);
        renderComments();
    };

    // Delete a reply (admin only)
    window.deleteReply = function (commentId, replyIndex) {
        if (!confirm('Delete this reply?')) return;
        const postId = getPostId();
        const comments = getComments(postId);
        const comment = comments.find(c => c.id === commentId);
        if (comment && comment.replies) {
            comment.replies.splice(replyIndex, 1);
            saveComments(postId, comments);
            renderComments();
        }
    };

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', renderComments);
})();
