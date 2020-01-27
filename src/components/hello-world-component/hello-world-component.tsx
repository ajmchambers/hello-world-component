import { Component, Prop, State, h } from "@stencil/core";
import { format } from "../../utils/utils";

@Component({
  tag: "hello-world-component",
  styleUrl: "hello-world-component.css",
  shadow: true
})
export class HelloWorldComponent {
  @Prop({ mutable: true, reflectToAttr: true }) first: string;
  @Prop({ mutable: true, reflectToAttr: true }) middle: string;
  @Prop({ mutable: true, reflectToAttr: true }) last: string;

  @State() editing: boolean = false;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  beginEditing = () => {
    this.editing = true;
  }

  renderName = () => {
    return (
      <div onClick={() => this.beginEditing()} class="displaying">
        Hello, World! I'm {this.getText()}
      </div>
    );
  }

  renderInput() {
    return (
      <div class="editing">
        <label>
          First:
          <input
            type="text"
            autofocus={true}
            value={this.first}
            onInput={event =>
              (this.first = (event.target as HTMLInputElement).value)
            }
          />
        </label>
        <label>
          Middle:
          <input
            type="text"
            value={this.middle}
            onInput={event =>
              (this.middle = (event.target as HTMLInputElement).value)
            }
          />
        </label>
        <label>
          Last:
          <input
            type="text"
            value={this.last}
            onInput={event =>
              (this.last = (event.target as HTMLInputElement).value)
            }
          />
        </label>
        <button onClick={() => (this.editing = false)}>Done</button>
      </div>
    );
  }

  render() {
    return this.editing ? this.renderInput() : this.renderName();
  }
}
