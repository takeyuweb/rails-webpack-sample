// 使う画像
require("../images/skyview.jpg");

interface Greeting {
  message: string;
}

class HelloGreeting implements Greeting {
  message = "Hello!";
}

function greet(greeting: Greeting) {
  console.log(greeting.message);
}

let greeting = new HelloGreeting();

greet(greeting);
