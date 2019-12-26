## 易优联科

### 编程题
 
1. 有几只小鸡和几只小兔子住在一个院子里面，主任数了数，小鸡和小兔一共有13个头和36只脚，请问小鸡有几只？小兔子有几只？(尽可能多)
```
function count(head,foot){
    if(typeof head !== number || typeof foot !== number) return;
    let i=0;
    for(let j=0;j<head;j++){
        i=head-i;
        if(i*2+j*4 === foot){
            return {
                i,j
            }
        }
    }
}
```

2. 请用html5/css3/js，实现星星在屏幕上出现，随机飞舞，最后消失的动画效果

3. 请实现页面宽度自适应，要1920px宽度屏幕，一行四列卡片元素，在宽度变化为800px时自动适应调整一行2列，在屏幕宽度小于650px时，一行一个卡片元素

### css

#### css3的变量和sass的变量有什么不同？
```

CSS变量，很像任何其它一种编程语言里的变量，可以让我们对一个值进行反复的引用。始自2017年4月，所有的现代浏览器都支持了这个功能，使得我们能编写出更紧凑、更清晰的CSS样式。

下面我将要介绍一下CSS变量的基本概念和用法，讲讲它和SAss变量的不同之处，以及如何兼容老CSS、SAss代码。

如何使用CSS变量

任何CSS属性 color, size, position 等都可以存放在CSS变量里。CSS变量的名称必须是以--为前缀，它们的声明和定义跟普通的CSS样式定义一样：

body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}

在其它css代码中引用这个变量需要使用var()方法。

a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}

如果你用firebug在浏览器里观察这些变量的使用，会发现被引用的变量并没有显示成它真实的值，仍然显示的是变量。

这个var()方法实际上可以有两个参数，第一个参数是需要引用的变量，而第二个参数是可选的，作用是如果这个变量没有找到时使用的替代值。

color: var(--primary, #7F583F);

“没有找到”的原因有可能是没有定义，或者是，定义了，但不在有效作用域内。

CSS变量的作用域

CSS变量的作用域和普通的样式属性是一样的。变量的作用范围是联级向下渗透的。比如，下面这个变量将会在整个页面生效。

body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}

而在一个CSS规则内定义的变量只会在这个规则内有效：

.content {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}

如果你在.content之外的地方引用这个变量，将不会有任何效果。

CSS变量和自定义属性

可以看出，CSS变量和普通的CSS属性的作用是类似的，声明变量，定义变量值，引用它们。

其实它们就是自定义CSS属性，唯一--primary 和 position 不同之处是，position是静态值，立即生效的，而 --primary 是需要引用才能生效的。

浏览器对CSS变量的支持意味着，开发人员可以定义任意的CSS属性。 这绝对是一个令人兴奋的事情，它的意义就如同CSS媒体查询(media queries)功能的出现，彻底的让开发人员摆脱了用JavaScript监听器来监听浏览器窗口大小的变化。CSS变量开启了一个新的通道，让我们不再依赖JS和CSS预处理器。

CSS变量比较Sass变量：切换主题颜色

CSS变量和Sass变量不同，在某些方面，CSS变量比Sass变量更好用。比如，设计网站的主题色调。使用SASS也很容易实现这个，比如定义不同的颜色存放在Sass maps里，循环它们，生成各种不同的classes：

.theme-1 {
  a {
    color: #7F583F;
    text-decoration-color: #F7EFD2;
  }
}

.theme-2 {
  a {
    color: #D51522;
    text-decoration-color: #F4F6D8;
  }
}

/* etc */

CSS代码容易生成，但有多少种颜色我们就需要生成多少个class。同时只有一个能用到。

而使用CSS变量，我们可以使用JavaScript来控制变量的值：

document.body.style.setProperty('--primary', '#7F583F');
document.body.style.setProperty('--secondary', '#F7EFD2');

只需要改动一个值，整个页面的引用了这个变量的地方的颜色都会发送变化，代码变得简介干净。

CSS变量比较Sass变量：媒体查询 media queries

在SASS里，变量在media queries无法重新定义的。比如，你希望在不同的媒体查询条件里定义不同的颜色变量，如下：

$primary: #7F583F;
$secondary: #F7EFD2;

a {
  color: $primary;
  text-decoration-color: $secondary;

  @media screen and (min-width: 768px) {
    $primary: #F7EFD2;
    $secondary: #7F583F;
  }
}

很可惜，这种写法在Sass里是无效的，因为Sass是一个预处理工具，无法知道这些媒体查询条件真正执行是的样子。此时，如果使用CSS变量：

body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}

a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}

@media screen and (min-width: 768px) {
  body {
    --primary:  #F7EFD2;
    --secondary: #7F583F;
  }
}

这种写法是可以正确的执行，因为变量的引用是在浏览器里发生的，浏览器知道什么时候该引用哪个变量。

浏览器对CSS变量的支持情况

火狐浏览器从2014年就开始支持CSS变量了，而谷歌浏览器和Safari是从2016年3月开始支持的，落后的Edge浏览器最终也在2017年4月支持了CSS变量！(Source: CanIUse。)所以，可以说，使用css变量是比较安全的。而如果你的CSS代码想兼容老的IE浏览器，请看下面的兼容补救方法。

如何兼容老式浏览器

其实很简单：

a {
  color: #7F583F;
  color: var(--primary);
}

首先声明备用属性，然后定义CSS变量，支持CSS变量的浏览器会使用后者，而不认识CSS变量的浏览器会使用前者。

如何在Sass兼容老式浏览器

如果你使用的是Sass，可以通过一个Sass mixmin来自动达到兼容的目的。

$vars: (
  primary: #7F583F,
);

body {
  --primary: map-get($vars, primary);
}

@mixin var($property, $varName) {
  #{$property}: map-get($vars, $varName);
  #{$property}: var(--#{$varName}, map-get($vars, $varName));
}

这样使用它：

a {
  @include var(color, primary);
}

输出的CSS代码是这样的：

a {
  color: #7F583F;
  color: var(--primary, #7F583F);
}

这样，如果我们想修改 --primary 或 备用值，只需要编辑 $vars，CSS的其它地方都会跟着变化。
```

#### 使用css让div消失不见，有多少种方法？