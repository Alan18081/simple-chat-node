import Handlebars from 'handlebars/dist/handlebars.min';

class View {
  render(name,data) {
    const template = document.querySelector(`#${name}-template`).textContent;
    const renderFn = Handlebars.compile(template);
    return renderFn(data);
  }
}

export default View;