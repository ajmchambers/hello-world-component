import { Component, Prop, State } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @Prop({ mutable: true, reflectToAttr: true }) first: string;
  @Prop({ mutable: true, reflectToAttr: true }) middle: string;
  @Prop({ mutable: true, reflectToAttr: true }) last: string;

  @State() editing: boolean = false;

  firstEl: HTMLInputElement;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  beginEditing() {
    this.editing = true;
    this.firstEl.focus();
  }

  renderName() {
    return <div onClick={() => this.beginEditing()} class="displaying">Hello, World! I'm {this.getText()}</div>;
  }

  renderInput() {
    return <div class="editing">
      <label>
        First:
        <input 
          type="text" 
          value={this.first} 
          ref={elm => this.firstEl = elm}
          onInput={(event) => this.first = (event.target as HTMLInputElement).value} />
      </label>
      <label>
        Middle:
        <input 
          type="text" 
          value={this.middle} 
          onInput={(event) => this.middle = (event.target as HTMLInputElement).value} />
      </label>
      <label>
        Last:
        <input 
          type="text" 
          value={this.last} 
          onInput={(event) => this.last = (event.target as HTMLInputElement).value} />
      </label>
      <button onClick={() => this.editing = false}>Done</button>
    </div>
  }

  render() {
    return this.editing ? this.renderInput() : this.renderName();
  }
}
