// Author: Antonio Daiute (TD-27)
// License: Apache-2.0
import { LitElement, html, css } from "lit";

class DddCardList extends LitElement {
  static get properties() {
    return {
      dddPrimary: { type: Boolean, attribute: "ddd-primary", reflect: true },
    };
  }

  constructor() {
    super();
    this.dddPrimary = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: var(--ddd-spacing-4, 16px);
        box-sizing: border-box;
      }

      .grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--ddd-spacing-4, 16px);
        justify-content: center;
      }

      ::slotted(ddd-card) {
        display: inline-block;
        width: 310px;
        max-width: 100%;
        border-radius: var(--ddd-radius-lg, 12px);
        box-shadow: var(--ddd-boxShadow-sm, 0 2px 6px rgba(0, 0, 0, 0.1));
        transition: transform 0.2s ease;
      }

      ::slotted(ddd-card:hover) {
        transform: translateY(-5px);
        box-shadow: var(--ddd-boxShadow-md, 0 4px 12px rgba(0, 0, 0, 0.15));
      }
    `;
  }

  render() {
    return html`<div class="grid"><slot></slot></div>`;
  }

  firstUpdated() {
    this._propagatePrimary();
  }

  updated(changedProps) {
    if (changedProps.has("dddPrimary")) {
      this._propagatePrimary();
    }
  }

  _propagatePrimary() {
    const cards = this.querySelectorAll("ddd-card");
    cards.forEach((card) => {
      card.setAttribute("ddd-primary", this.dddPrimary);
    });
  }
}

customElements.define("ddd-card-list", DddCardList);
