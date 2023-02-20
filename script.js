const X_AXIS = 2;
let el;
var cards;
var touches=[];
let colors= ["red", "rgb(0,255,0)", "blue", "pink", "purple"];
let no = {"red":0,"rgb(0,255,0)":0, "blue": 0, "pink": 0, "purple":0};
let previous_col;
let u =0;
let w =0;
let h=0;
let cards_open = [];
let c, c2;

function setup() {
    createCanvas(windowWidth-1, windowHeight-1);
    c=27;
    c2=color(c,c,c)
    cards=createGroup();
    let _x = [width/4,width*(1/2),width*(3/4)];
    let _y = [50 , 150, 250, 350, 450];
    for(let i=0;i<_x.length;i++){
      for(let j=0;j<_y.length;j++){
        let c = createSprite(_x[i],_y[j],50,70);
        let col = random(colors);
        no[col]++;
        col = check(col, no);
        c.shapeColor='white';
        c.cul=col;
        c.index= u ;
        cards.add(c);
        u++;
      }
    }
  }

  function draw() {
    background('black');
    
    setGradient(0, 0, width / 2, height, c2, color(0), X_AXIS);
    setGradient(width / 2, 0, width / 2, height, color(0), c2, X_AXIS);
    drawSprites();

    for (let i = 0; i < cards.length; i++) {
      const e = cards[i];
        if(mouseX-e.x<e.width/2+10/2 &&
          e.x-mouseX<e.width/2+10/2 && 
          mouseY-e.y<e.height/2+ 10/2 && 
          e.y-mouseY<e.height/2+10/2
          ){
            if(! cards_open.includes(e)){
              if(cards_open.length<3){
                cards_open.push(e)
                e.shapeColor = e.cul;
              }
            }
            if(cards_open.length>2){
              if(cards_open[0].cul==cards_open[1].cul && cards_open[1].cul==cards_open[2].cul){
                  cards_open.forEach(elm => {
                    cards.remove(elm)
                    elm.destroy();
                  });
                  cards_open=[];
                win();
              }else{      
                setTimeout(() => {                  
                  cards_open.forEach(elm => {
                    elm.shapeColor='white';
                  });
                  e.shapeColor='white';
                  cards_open=[];
                  mouseX=800;
                  mouseY=800;
                }, 500);
              }
              
            }
      }
    }
    if (cards.length==0) {
      textSize(60);
      fill('white');
      text("!! You Win !!",width/2-150,height/2);
      textSize(20);
      text('Reload to play Again',width/2-90,height/2 + 75)
    }
  }

  function check( col, no ){
    if(no[col]>3){
      no[col]=3;
      col = random(colors);
      no[col]++;
      if(no[col]>3){
        col = check(col,no);
      }
    }
    return col;
  }

  function win() {
    for (let i = 0; i < 6; i++) {
      let s = createSprite(width/2,height/2,50,50);
      s.shapeColor='rgba(180,180,180,0.3)'
      s.lifetime=5;
      s.width=900;
      s.height=1600;
    }
  }

  function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }
  