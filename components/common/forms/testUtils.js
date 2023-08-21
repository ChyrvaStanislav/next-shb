import React, { Component, useEffect } from 'react';

const SetOpenTestComponent = ({ setOpenForm }) => {
  useEffect(() => {
    if (setOpenForm) {
      setOpenForm(true);
    }
  }, [setOpenForm]);

  return <div />;
};

export default function testHOC(SomeComponent) {
  // eslint-disable-next-line react/prefer-stateless-function
  return class withHOC extends Component {
    render() {
      return (
        <div>
          <div id="root" />
          <SomeComponent.Consumer>
            {({ openForm, setOpenForm }) => (
              <div>
                <span>{openForm ? 'Open' : ''}</span>
                <SetOpenTestComponent setOpenForm={setOpenForm} />
              </div>
            )}
          </SomeComponent.Consumer>
        </div>
      );
    }
  };
}
