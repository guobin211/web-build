import React, { ChangeEvent, Component, HTMLAttributes } from 'react';

interface DataProps {
  type?: 'primary' | 'danger',
  value?: string,
}

export type InputProps = DataProps & HTMLAttributes<HTMLInputElement>;

type InputState = InputProps & {
  value: string
};

class Input extends Component<InputProps> {

  state: InputState = {
    value: ''
  }

  constructor(props: InputProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: InputProps, state: InputState): InputState {
    if (props.value && props.value !== state.value) {
      return {
        ...state,
        value: props.value
      }
    }
    return null;
  }

  handleChange(ev: ChangeEvent<HTMLInputElement>) {
    console.log(ev.target.value);
  }

  render() {
    const {state, handleChange} = this;
    return (
            <div className="mt-input">
              <label className="mt-input-label">
                <input type="text" className="mt-input-inner" value={state.value}
                       placeholder="input something..." onChange={handleChange}/>
              </label>
            </div>
    );
  }
}

export default Input;
