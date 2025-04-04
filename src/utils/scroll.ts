
/**
 * Smoothly scrolls to a specific element by ID
 * @param elementId The ID of the element to scroll to
 * @param offset Optional offset from the top of the element in pixels (default: 0)
 * @param duration Duration of the scroll animation in milliseconds (default: 500)
 */
export const scrollToElement = (elementId: string, offset = 0, duration = 500): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Detects if an element is in the viewport
 * @param element The element to check
 * @param offset Offset in pixels to adjust when the element is considered in view (default: 0)
 * @returns Boolean indicating if the element is in the viewport
 */
export const isElementInView = (element: HTMLElement, offset = 0): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight - offset) &&
    rect.bottom >= offset &&
    rect.left <= window.innerWidth &&
    rect.right >= 0
  );
};

/**
 * Creates an animation-on-scroll effect for elements with a specific class
 * @param className Class name of elements to animate
 * @param animationClass Class to add when element is in view
 * @param threshold Percentage of element that needs to be visible to trigger animation (default: 0.2)
 */
export const setupScrollAnimations = (
  className: string,
  animationClass: string,
  threshold = 0.2
): void => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold }
  );

  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach((el) => observer.observe(el));
};
