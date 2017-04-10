class Circle {
  showCircle() {
    var app = document.getElementById('app');
    app.attr('cy', 90);
    app.attr('r', 30);
  }
}


const circle = Circle();
circle.showCircle();
