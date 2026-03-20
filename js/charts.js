/* ============================================
   HCI Portfolio — SVG Data Visualizations
   ============================================ */

(function () {
    // Utility: animate a value from 0 to target
    function animateValue(el, attr, target, duration) {
        const start = performance.now();
        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.setAttribute(attr, eased * target);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // Create an SVG element
    function svgEl(tag, attrs) {
        const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (const [k, v] of Object.entries(attrs || {})) {
            el.setAttribute(k, v);
        }
        return el;
    }

    // --- Chart: Food Waste Frequency (Horizontal Bar) ---
    function renderWasteFrequency(svgId) {
        const svg = document.getElementById(svgId);
        if (!svg) return;

        const data = [
            { label: 'Monthly or less', value: 64, count: '7/11', color: '#C4654A' },
            { label: 'Every 1–2 weeks', value: 27, count: '3/11', color: '#D4937F' },
            { label: 'Never', value: 9, count: '1/11', color: '#7D9B76' }
        ];

        const barHeight = 36;
        const barGap = 16;
        const labelWidth = 140;
        const maxBarWidth = 350;
        const startX = labelWidth + 10;

        data.forEach((d, i) => {
            const y = 20 + i * (barHeight + barGap);

            // Label
            const label = svgEl('text', {
                x: labelWidth, y: y + barHeight / 2 + 5,
                'text-anchor': 'end', class: 'chart-label'
            });
            label.textContent = d.label;
            svg.appendChild(label);

            // Bar background
            const bgBar = svgEl('rect', {
                x: startX, y: y, width: maxBarWidth, height: barHeight,
                rx: 6, fill: '#F5F0EB'
            });
            svg.appendChild(bgBar);

            // Bar fill
            const barWidth = (d.value / 100) * maxBarWidth;
            const bar = svgEl('rect', {
                x: startX, y: y, width: 0, height: barHeight,
                rx: 6, fill: d.color, class: 'chart-bar'
            });
            svg.appendChild(bar);

            // Value text
            const val = svgEl('text', {
                x: startX + barWidth + 10, y: y + barHeight / 2 + 5,
                class: 'chart-value'
            });
            val.textContent = `${d.value}% (${d.count})`;
            svg.appendChild(val);

            // Animate on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateValue(bar, 'width', barWidth, 800 + i * 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(svg);
        });
    }

    // --- Chart: Most Wasted Food Types (Horizontal Bar) ---
    function renderWastedTypes(svgId) {
        const svg = document.getElementById(svgId);
        if (!svg) return;

        const data = [
            { label: 'Short shelf-life', value: 73, count: '8/11', color: '#C4654A' },
            { label: 'Prepared meals', value: 36, count: '4/11', color: '#D4937F' },
            { label: 'Other', value: 18, count: '2/11', color: '#BDC3C7' }
        ];

        const barHeight = 30;
        const barGap = 14;
        const labelWidth = 140;
        const maxBarWidth = 350;
        const startX = labelWidth + 10;

        data.forEach((d, i) => {
            const y = 18 + i * (barHeight + barGap);

            const label = svgEl('text', {
                x: labelWidth, y: y + barHeight / 2 + 5,
                'text-anchor': 'end', class: 'chart-label'
            });
            label.textContent = d.label;
            svg.appendChild(label);

            const bgBar = svgEl('rect', {
                x: startX, y: y, width: maxBarWidth, height: barHeight,
                rx: 5, fill: '#F5F0EB'
            });
            svg.appendChild(bgBar);

            const barWidth = (d.value / 100) * maxBarWidth;
            const bar = svgEl('rect', {
                x: startX, y: y, width: 0, height: barHeight,
                rx: 5, fill: d.color, class: 'chart-bar'
            });
            svg.appendChild(bar);

            const val = svgEl('text', {
                x: startX + barWidth + 10, y: y + barHeight / 2 + 5,
                class: 'chart-value'
            });
            val.textContent = `${d.value}% (${d.count})`;
            svg.appendChild(val);

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateValue(bar, 'width', barWidth, 800 + i * 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(svg);
        });
    }

    // --- Chart: Click Count Comparison ---
    function renderClickCount(svgId) {
        const svg = document.getElementById(svgId);
        if (!svg) return;

        const data = [
            { label: 'Log food item', value: 4.2, optimal: 3, color: '#7D9B76', note: 'Within buffer' },
            { label: 'Check expiry', value: 3.8, optimal: 2, color: '#7D9B76', note: 'Within buffer' },
            { label: 'Search recipes', value: 8.9, optimal: 3, color: '#C4654A', note: 'Outside buffer' }
        ];

        const barHeight = 36;
        const barGap = 20;
        const labelWidth = 130;
        const maxValue = 10;
        const maxBarWidth = 330;
        const startX = labelWidth + 10;

        data.forEach((d, i) => {
            const y = 20 + i * (barHeight + barGap);

            const label = svgEl('text', {
                x: labelWidth, y: y + barHeight / 2 + 5,
                'text-anchor': 'end', class: 'chart-label'
            });
            label.textContent = d.label;
            svg.appendChild(label);

            // Background
            const bgBar = svgEl('rect', {
                x: startX, y: y, width: maxBarWidth, height: barHeight,
                rx: 6, fill: '#F5F0EB'
            });
            svg.appendChild(bgBar);

            // Optimal line
            const optX = startX + (d.optimal / maxValue) * maxBarWidth;
            const optLine = svgEl('line', {
                x1: optX, y1: y - 2, x2: optX, y2: y + barHeight + 2,
                stroke: '#999', 'stroke-width': 1.5, 'stroke-dasharray': '4,3'
            });
            svg.appendChild(optLine);

            // Bar
            const barWidth = (d.value / maxValue) * maxBarWidth;
            const bar = svgEl('rect', {
                x: startX, y: y, width: 0, height: barHeight,
                rx: 6, fill: d.color, class: 'chart-bar'
            });
            svg.appendChild(bar);

            // Value
            const val = svgEl('text', {
                x: startX + barWidth + 10, y: y + barHeight / 2 + 5,
                class: 'chart-value'
            });
            val.textContent = `${d.value} clicks`;
            svg.appendChild(val);

            // Note
            const note = svgEl('text', {
                x: startX + barWidth + 80, y: y + barHeight / 2 + 5,
                class: 'chart-highlight'
            });
            note.textContent = d.note;
            svg.appendChild(note);

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateValue(bar, 'width', barWidth, 800 + i * 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(svg);
        });
    }

    // --- Chart: Likert Scale Stacked Bars ---
    function renderLikert(svgId) {
        const svg = document.getElementById(svgId);
        if (!svg) return;

        const categories = [
            { label: 'Logging efficiency', positive: 82, neutral: 9, negative: 9 },
            { label: 'Expiry visibility', positive: 73, neutral: 18, negative: 9 },
            { label: 'Recipe search', positive: 45, neutral: 27, negative: 28 },
            { label: 'Overall integration', positive: 55, neutral: 27, negative: 18 }
        ];

        const colors = { positive: '#7D9B76', neutral: '#D4C5B0', negative: '#C4654A' };
        const barHeight = 30;
        const barGap = 16;
        const labelWidth = 140;
        const maxBarWidth = 350;
        const startX = labelWidth + 10;

        categories.forEach((cat, i) => {
            const y = 18 + i * (barHeight + barGap);

            // Label
            const label = svgEl('text', {
                x: labelWidth, y: y + barHeight / 2 + 5,
                'text-anchor': 'end', class: 'chart-label'
            });
            label.textContent = cat.label;
            svg.appendChild(label);

            // Background
            const bgBar = svgEl('rect', {
                x: startX, y: y, width: maxBarWidth, height: barHeight,
                rx: 5, fill: '#F5F0EB'
            });
            svg.appendChild(bgBar);

            // Stacked segments
            let xOffset = startX;
            const segments = [
                { value: cat.positive, color: colors.positive },
                { value: cat.neutral, color: colors.neutral },
                { value: cat.negative, color: colors.negative }
            ];

            segments.forEach((seg, j) => {
                const width = (seg.value / 100) * maxBarWidth;
                const bar = svgEl('rect', {
                    x: xOffset, y: y, width: 0, height: barHeight,
                    fill: seg.color, class: 'chart-bar'
                });
                // Round corners on first and last segments
                if (j === 0) bar.setAttribute('rx', 5);
                if (j === segments.length - 1) bar.setAttribute('rx', 5);
                svg.appendChild(bar);

                const finalX = xOffset;
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateValue(bar, 'width', width, 800 + j * 150);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.3 });
                observer.observe(svg);

                xOffset += width;
            });

            // Percentage label on right
            const pctLabel = svgEl('text', {
                x: startX + maxBarWidth + 10, y: y + barHeight / 2 + 5,
                class: 'chart-value'
            });
            pctLabel.textContent = `${cat.positive}% positive`;
            svg.appendChild(pctLabel);
        });

        // Legend
        const legendY = 18 + categories.length * (barHeight + barGap) + 10;
        const legendItems = [
            { label: 'Positive', color: colors.positive },
            { label: 'Neutral', color: colors.neutral },
            { label: 'Negative', color: colors.negative }
        ];

        legendItems.forEach((item, i) => {
            const x = startX + i * 100;
            const rect = svgEl('rect', {
                x: x, y: legendY, width: 12, height: 12, rx: 2, fill: item.color
            });
            svg.appendChild(rect);

            const text = svgEl('text', {
                x: x + 18, y: legendY + 10, class: 'chart-label'
            });
            text.textContent = item.label;
            svg.appendChild(text);
        });
    }

    // --- Initialize all charts ---
    document.addEventListener('DOMContentLoaded', () => {
        renderWasteFrequency('chart-waste-frequency');
        renderWastedTypes('chart-wasted-types');
        renderClickCount('chart-click-count');
        renderLikert('chart-likert');
    });
})();
