export default function(what, inject) {
  console.log('mfe-plugin starts!');
  inject('hello', () => {
    console.log('Hello function called');
    // console.log(what);
  });
  // inject('hello', what.app);
}
