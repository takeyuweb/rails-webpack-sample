// 使う画像
// いまのところこのようにどこかで読み込まないと
// Railsテンプレートからは参照できない（ public/bundle 以下に書き出されない）
import "../images/skyview.jpg";

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
