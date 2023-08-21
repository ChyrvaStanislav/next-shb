/**
 * We use this class to trigger custom event for Google Analytics to check hover on different elements.
 * The event pushes to the dataLayer if user hold pointer on target elements more than timeout (400ms by default).
 *
 * To use it:
 * - Create new class instance and path "target label" as argument (label would be caught as Action in GA)
 * - Set up "instance.handleMouseEnter()" on "onMouseEnter" event
 * - Set up "instance.handleMouseLeave()" on "onMouseLeave" event
 */
class GAHoverEventsHandler {
  /**
   * @param targetLabel {string}
   * @param timeout {number}
   */
  constructor(targetLabel, timeout = 400) {
    this.targetLabel = targetLabel;
    this.timeout = timeout;
    this.timerId = null;
  }

  handleMouseEnter() {
    if (!this.timerId) {
      this.timerId = setTimeout(() => {
        const event = {
          event: 'hover_element',
          hover_element_label: this.targetLabel,
        };

        if (window?.dataLayer?.push) {
          window.dataLayer.push(event);
        }

        clearTimeout(this.timerId);
        this.timerId = null;
      }, this.timeout);
    }
  }

  handleMouseLeave() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}

export default GAHoverEventsHandler;
