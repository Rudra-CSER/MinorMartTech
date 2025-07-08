document.addEventListener('DOMContentLoaded', () => {
    const carouselElement = document.getElementById('carouselExampleRide');

    if (carouselElement) {
        // Bootstrap's Carousel instance can be used to control it programmatically.
        // However, the request is for a simple setInterval based slider.
        // We need to be careful not to conflict too much with Bootstrap's own event listeners
        // if data-bs-ride="carousel" is also active.
        // For a simple setInterval override, we can manually trigger 'next'.

        const intervalTime = 5000; // Time in milliseconds (e.g., 5 seconds)
        let carouselInstance;

        // It's good practice to ensure Bootstrap's JS has initialized the carousel
        // if we want to use its API. If not, we might need a more manual approach.
        // However, Bootstrap 5 automatically initializes carousels with data-bs-ride="carousel".
        // If we want to ensure our interval is the *only* thing controlling auto-slide,
        // we might remove data-bs-ride="carousel" from the HTML or set it to "false".

        // For this implementation, let's assume we want to use Bootstrap's 'next' method.
        // Get the Bootstrap Carousel instance
        if (bootstrap && bootstrap.Carousel) {
            carouselInstance = bootstrap.Carousel.getInstance(carouselElement);

            if (!carouselInstance) {
                // If no instance exists, Bootstrap might not have auto-initialized it (e.g. no data-bs-ride="carousel")
                // Or it's set to data-bs-ride="false". We can create one.
                carouselInstance = new bootstrap.Carousel(carouselElement, {
                    interval: false, // Disable Bootstrap's own auto-sliding initially
                    ride: false // Explicitly prevent auto-ride from bootstrap
                });
            } else {
                // If an instance already exists (e.g. from data-bs-ride="carousel"), pause its auto-cycling.
                carouselInstance.pause();
            }
        }

        if (carouselInstance) {
            // Function to go to the next slide
            const slideNext = () => {
                if (document.visibilityState === 'visible') { // Only slide if the page is visible
                    carouselInstance.next();
                }
            };

            // Start our custom interval
            setInterval(slideNext, intervalTime);

            // Optional: If you want to re-enable Bootstrap's pause on hover behavior with your custom interval,
            // you would need to clear and restart the interval on mouseenter/mouseleave.
            // For simplicity, this is omitted here but Bootstrap's default 'pause' option on the
            // carousel HTML (data-bs-pause="hover") would not directly affect this custom setInterval.

        } else {
            console.warn('Bootstrap Carousel instance not found or could not be initialized for custom sliding.');
            // Fallback or more manual image switching could be implemented here if Bootstrap JS isn't available/working.
            // For example, manually cycling through 'active' class on carousel items.
            // This would be more complex to sync with indicators and controls.
        }
    }
});
