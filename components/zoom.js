document.addEventListener('DOMContentLoaded', function () {
    // Select model showcase image containers inside the #models section.
    // Use class-contains selector to match Tailwind-style bracketed classes like h-[600px]
    const containers = document.querySelectorAll('#models [class*="h-[600px]"]');

    console.log('[zoom] found containers:', containers.length);

    containers.forEach((container, idx) => {
        const img = container.querySelector('img');
        if (!img) {
            console.warn('[zoom] no image in container', container);
            return;
        }

        // Create magnifier glass (lens)
        const glass = document.createElement('div');
        glass.className = 'zoom-lens';
        // Ensure lens has explicit size (matches CSS but set here to be safe)
    const lensSize = 100; // smaller lens
        glass.style.width = lensSize + 'px';
        glass.style.height = lensSize + 'px';
        glass.style.position = 'absolute';
        glass.style.display = 'none';
        glass.style.pointerEvents = 'none';

        // Insert lens into the image container
        container.style.position = container.style.position || 'relative';
        container.appendChild(glass);

    const zoom = 2; // reduced magnification to make zoom less strong

        function setBackground() {
            const rect = img.getBoundingClientRect();
            glass.style.backgroundImage = `url(${img.src})`;
            // compute how the natural image is scaled to cover the container (object-fit: cover)
            const naturalW = img.naturalWidth || img.width;
            const naturalH = img.naturalHeight || img.height;
            const scale = Math.max(rect.width / naturalW, rect.height / naturalH);
            const dispW = naturalW * scale;
            const dispH = naturalH * scale;
            // offsets of the displayed (scaled) image relative to the container (center-cropped)
            const offsetX = (dispW - rect.width) / 2;
            const offsetY = (dispH - rect.height) / 2;
            // store for move calculations
            glass._zoomData = { scale, dispW, dispH, offsetX, offsetY, rectWidth: rect.width, rectHeight: rect.height };
            // background size should be displayed size * zoom
            glass.style.backgroundSize = dispW * zoom + 'px ' + dispH * zoom + 'px';
        }

        function move(e) {
            e.preventDefault();
            const rect = img.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            // clamp to image bounds
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            if (y < 0) y = 0;
            if (y > rect.height) y = rect.height;

            // If image is too short, disable zoom entirely
            const topLimit = 100;
            const bottomLimit = 100;
            if (rect.height <= topLimit + bottomLimit) {
                glass.style.opacity = '0';
                glass.style.display = 'none';
                return;
            }

            // Disable zoom in the top and bottom restricted zones
            if (y < topLimit || y > rect.height - bottomLimit) {
                if (glass.style.display !== 'none') {
                    glass.style.opacity = '0';
                    setTimeout(() => { glass.style.display = 'none'; }, 120);
                }
                return;
            }

            // Ensure lens visible when inside allowed area
            if (glass.style.display === 'none') {
                setBackground();
                glass.style.display = 'block';
                glass.style.opacity = '1';
            }

            // position lens (relative to container)
            const lensLeft = x - lensSize / 2;
            const lensTop = y - lensSize / 2;
            glass.style.left = Math.max(0, Math.min(lensLeft, rect.width - lensSize)) + 'px';
            glass.style.top = Math.max(0, Math.min(lensTop, rect.height - lensSize)) + 'px';

            // Use zoomData to map cursor in container to position within the scaled image
            const z = glass._zoomData || {};
            const displayX = x + (z.offsetX || 0); // position inside scaled image
            const displayY = y + (z.offsetY || 0);
            const bgX = -(displayX * zoom - lensSize / 2);
            const bgY = -(displayY * zoom - lensSize / 2);
            glass.style.backgroundPosition = `${bgX}px ${bgY}px`;
        }

        container.addEventListener('mouseenter', () => {
            setBackground();
            glass.style.display = 'block';
            // make visible via opacity (CSS transition handles fade)
            glass.style.opacity = '1';
        });
        container.addEventListener('mouseleave', () => {
            // fade out then hide
            glass.style.opacity = '0';
            setTimeout(() => { glass.style.display = 'none'; }, 200);
        });
        container.addEventListener('mousemove', move);
        container.addEventListener('touchmove', move);

        // Update background size on load/resize (image may not be loaded yet)
        img.addEventListener('load', setBackground);
        window.addEventListener('resize', setBackground);
    });
});