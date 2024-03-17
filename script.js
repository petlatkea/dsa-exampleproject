"use strict"

window.addEventListener("load", sidenVises);

let grid;
let forsøg;

function sidenVises() {
    
    // lav grid-array
    grid = new Array(17);
    for( let i=0; i < grid.length; i++ ) {
        grid[i] = new Array(17);   
    }
    
    // byg grid i HTML
    const spilleplade = document.querySelector("#board");
    for( var i=0; i < 17*17; i++ ) {
        const felt = document.createElement("div");
        felt.className = "felt";
        spilleplade.appendChild( felt );
    }    
    
    // initialiser grid med farver
    initialiserGrid();
    
    // registrer tryk på farveknapper
    document.querySelectorAll(".colorbutton")
        .forEach( (knap) => knap.addEventListener("click", handleClick));
    
    // nulstil forsøgstæller
    forsøg = 30;
    
    visGrid();
    
    visForsøg();
}

function fjernClick() {
    document.querySelectorAll(".colorbutton")
    .forEach( (knap) => knap.removeEventListener("click", handleClick));
    
}

function handleClick( event ) {
    const oldColor = grid[0][0];
    const newColor = event.target.id.substr(5);

    // farv så meget af griddet vi kan - fra øverste venstre hjørne
    farv( oldColor, newColor, 0, 0 );
    
    // tæl forsøg ned
    forsøg--;
    
    // vis det resulterende grid
    visGrid();
    
    // og vis hvor mange forsøg vi har tilbage
    visForsøg();
    
    // tjek om griddet er blevet ensfarvet
    if( erGridFyldt() ) {
        alert("YEAH DU VANDT!");   
        fjernClick();
    } else 
    // tjek om vi har brugt alle vores forsøg
    if( forsøg == 0 ) {
        alert("GAME OVER");
        fjernClick();
    }
}

function farv( oldColor, newColor, x, y ) {
    if( grid[y][x] == oldColor ) {
        grid[y][x] = newColor;
        
        if( x > 0 ) {
            farv( oldColor, newColor, x-1, y );   
        }
        if( x < grid[y].length-1 ) {
            farv( oldColor, newColor, x+1, y );   
        }
        if( y > 0 ) {
            farv( oldColor, newColor, x, y-1 );   
        }
        if( y < grid.length-1 ) {
            farv( oldColor, newColor, x, y+1 );
        }
    }
}

function initialiserGrid() {
    for( let i=0; i < grid.length; i++ ) {
        for( let j=0; j < grid[i].length; j++ ) {
            const farve = Math.floor( Math.random() * 5 ) + 1;
            grid[i][j] = farve;
        }
    }
}

function erGridFyldt() {
    const farve = grid[0][0];
    for( let i=0; i < grid.length; i++ ) {
        for( let j=0; j < grid[i].length; j++ ) {
            if( grid[i][j] != farve ) {
                return false;
            }
        }
    }
    
    return true;
}

function visGrid() {
    document.querySelectorAll(".felt").forEach( (felt, index) => {
        const farve = grid[Math.floor(index/17)][index%17];
        // fjern alle andre klasser og genskab klasse-tingen
        felt.className = "felt color"+farve;
    });
}

function visForsøg() {
    document.querySelector("#tries_left").textContent = forsøg;   
}