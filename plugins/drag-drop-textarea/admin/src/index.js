import DragDropTextarea from './components/DragDropTextarea';

const registerField = (field) => {
  strapi.registerField({
    type: 'drag-drop-textarea',
    Component: DragDropTextarea,
  });
};

export default {
  register(app) {
    app.addFieldType(registerField);
  },
};
