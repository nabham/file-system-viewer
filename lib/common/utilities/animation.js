
/**
 * @description This method is used to animate node
 * by toggling classes
 * 
 * @param {HTMLElement} node DOM node
 * @param {string} className class name to be applied and toggled
 * @param {number} duration duration of animation
 */
export const animate = (node, className, duration) => {
  node.classList.toggle(className);

  setTimeout(() => {
    if (node) {
      node.classList.toggle(className);
    }
  }, duration);
}