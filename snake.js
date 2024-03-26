const canvas = document.getElementById("snakeCanvas");
const context = canvas.getContext("2d");

function StartGame(){
    const gridSize = 30;
    const snake = [ { x: 100, y: 100 } ]
    let direction = "down"
    let food = foodPosition();

    pic = new Image();
    pic.src  = 'C:/Users/Web/Desktop/Sulustan/M7/apple.png'

    function foodPosition(){
        max_x = (canvas.width / gridSize) - 1;
        max_y = (canvas.height / gridSize) - 1;

        grid_x = Math.floor(Math.random() * max_x) - 0;
        grid_y = Math.floor(Math.random() * max_y) - 0;

        const x = grid_x * gridSize;
        const y = grid_y * gridSize;

        return {x,y}

    }

    function draw(){
        context.clearRect(0 ,0 ,canvas.width, canvas.height )

        context.fillStyle = "green";
        snake.forEach( function(segment){ context.fillRect(segment.x, segment.y, gridSize, gridSize);});

        context.fillStyle = "red";
        context.fillRect(food.x, food.y, gridSize, gridSize);

        context.drawImage(pic, food.x, food.y, gridSize, gridSize);
    
    }

    function move(){
        const head = {...snake[0]}
        switch(direction){
            case "up":
                head.y -= gridSize;
                break;
            case "down":
                head.y += gridSize;
                break;
            case "left":
                head.x -= gridSize;
                break;
            case "right":
                head.x += gridSize;
                break;
        }

        if (head.x === food.x && head.y === food.y ) {
            snake.unshift(food);
            food = foodPosition();
        }
        else{
            snake.pop();
        }


        if (head.x < 0){
            head.x = canvas.width;
        }

        if (head.x > canvas.width){
            head.x = 0
        }

        if (head.y < 0){
            head.y = canvas.height;
        }

        if (head.y > canvas.height){
            head.y = 0
        }

        if (collisionItself(head)){
            alert("GAME OVER");
            location.reload();
        }
        snake.unshift(head)
        

    }

    function collisionItself(head){
        return snake.slice(1).some( segment=> segment.x === head.x && segment.y === head.y);
    }

    function onKeyPress(event){
        const key = event.key.toLowerCase();

        if (["w", "a", "s", "d"]. includes(key)){
            if (key === "w" && direction !== "down"){ direction = "up";}
            if (key === "a" && direction !== "right"){ direction = "left";}
            if (key === "s" && direction !== "up"){ direction = "down";}
            if (key === "d" && direction !== "left"){ direction = "right";}
        }

    }

    window.addEventListener('keydown', onKeyPress);
    
    function LoopGame(){
       move(); 
       draw();
        
    }

    setInterval(LoopGame, 150);
}