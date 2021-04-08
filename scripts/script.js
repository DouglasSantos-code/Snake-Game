window.onload = () => {

    let stage = document.querySelector('#stage');
    let ctx = stage.getContext("2d");

    document.addEventListener("keydown", keyPush)

    const advance_speed = 1; //Quantidade de casa que a cobra avança

    let vx = 1;
    let vy = 0;
    let position_x = 10;
    let position_y = 15;
    let piece_size = 20;
    let board_size = 25;
    let apple_x = apple_y = 15;

    let trail = [] //Rastro
    tail = 3;



    let btnEasy = document.querySelector('#btn1');
    let btnMedium = document.querySelector('#btn2');
    let btnHard = document.querySelector('#btn3');
    var valor = 0


    btnEasy.addEventListener('click', function easy() {
        valor = 120
        setInterval(game, valor);
        btnEasy.removeEventListener('click', easy)
        document.querySelector('#btn2').style.display = 'none'
        document.querySelector('#btn3').style.display = 'none'
        document.querySelector('.start').style.display = 'none'
        document.querySelector('.contanier').style.display = 'flex'

    })

    btnMedium.addEventListener('click', function medium() {
        valor = 80
        setInterval(game, valor);
        btnMedium.removeEventListener('click', medium)
        document.querySelector('#btn1').style.display = 'none'
        document.querySelector('#btn3').style.display = 'none'
        document.querySelector('.start').style.display = 'none'
        document.querySelector('.contanier').style.display = 'flex'


    })

    btnHard.addEventListener('click', function hard() {
        valor = 40
        setInterval(game, valor);
        btnHard.removeEventListener('click', hard)
        document.querySelector('#btn2').style.display = 'none'
        document.querySelector('#btn1').style.display = 'none'
        document.querySelector('.start').style.display = 'none'
        document.querySelector('.contanier').style.display = 'flex'

    })


    function game() {


        position_x += vx;
        position_y += vy;
        if (position_x < 0) {
            position_x = board_size - 1
        }
        if (position_x > board_size - 1) {
            position_x = 0
        }
        if (position_y < 0) {
            position_y = board_size - 1
        }
        if (position_y > board_size - 1) {
            position_y = 0
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height); //DEFINE O QUADRADO PRETO

        ctx.fillStyle = "red"; // Define as Maça
        ctx.fillRect(apple_x * piece_size, apple_y * piece_size, piece_size, piece_size);

        ctx.fillStyle = "gray";
        for (i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * piece_size, trail[i].y * piece_size, piece_size - 1, piece_size - 1);
            if (trail[i].x == position_x && trail[i].y == position_y) {
                vx = vy = 0 //GAMEOVER
                tail = 3
                document.querySelector('.end').style.display = 'flex'
                document.querySelector('.contanier').style.display = 'none'
                document.querySelector('#btnRestart').addEventListener('click', ()=>{

                 document.location.reload() 
                })


            }
        }
        trail.push({
            x: position_x,
            y: position_y
        })
        while (trail.length > tail) {
            trail.shift(); //Tirando o elemento no array, da CALDA.
        }

        if (apple_x == position_x && apple_y == position_y) {
            tail++;
            apple_x = Math.floor(Math.random() * board_size)
            apple_y = Math.floor(Math.random() * board_size)
        }

    }


    function keyPush(event) {

        const left = 37
        const up = 38
        const right = 39
        const down = 40

        let goingLeft = vx === -advance_speed
        let goingUp = vy === -advance_speed
        let goingRight = vx === advance_speed
        let goingDown = vy === advance_speed

        if (event.keyCode === left && !goingRight) {
            vx = -advance_speed
            vy = 0
        } else if (event.keyCode === up && !goingDown) {
            vx = 0
            vy = -advance_speed
        } else if (event.keyCode === right && !goingLeft) {
            vx = advance_speed
            vy = 0
        } else if (event.keyCode === down && !goingUp) {
            vx = 0
            vy = advance_speed;
        }
    }
}