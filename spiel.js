/**
 * 
 * Das window-Objekt repräsentiert ein geöffnetes Fenster in dem Browser.
 * Alle Eigenschaften und Methoden, die direkt in der js-Datei eines <script>-Tags einer html-Seite stehen,
 * werdem dem window-Objekt hinzugefügt.
 * Quelltext, der direkt in der js-Datei steht wird beim Aufbau der Seite durch das Objekt window ausgeführt und 
 * kann danach nicht nochmal aufgerufen werden.
 * Eigenschaften und Methoden des window-Objekt können mittels der Punktnotation beim window-Objekts angesprochen werden,
 * nur beim window-Objekt kann die Punktnotation aber auch weggelassen werden und die Eigenschaften und Methoden können direkt
 * angesprochen werden (d.h. ohne Punktnotation)
 */

/**
 * Klassen
 *  §   Idee für das Erzeugen von Objekten: 
 *  
 *      Erstelle eine Klasse "class" (=Bauplan), nach deren Vorschrift dann Objekte erzeugt werden. Eine Klasse gibt vor
 *      welche Eigenschaften (=Attribute) und welche Fähigkeiten (=Methoden) Objetke haben sollen, die nach diesem Bauplan
 *      gebaut wurden.
 *      Wird ein Objekt nach dem Bauplan gebaut, muss festgelegt werden, mit welchen konkreten Werten die Eigenschaften (=Attribute)
 *      belegt werden sollen.
 */

class Hintergrund {

    /**
     * 
     * Der Konstruktor "constructor" legt für alle Objekte, die nach dem Bauplan gebaut werden, fest, 
     * welche Attribute die späteren Objekte haben sollen, hier z.B. die x-Koordinaten der Hintergrundbilder.
     * 
     * this: 
     * In "this"(=dieses) steckt immer gerade das Objekt, welches erzeugt wird, d.h. "this.xV" spricht die Eigenschaften "x-Koordinate Vorne" dieses Objekts an, dass gerade erstellt wird.
     * Würde man das "this" weglassen, würde "xV" nicht die Eigenschaft "x-Koordinate Vorne" dieses Objekts ansprechen,
     * sondern versuchen eine globale Variable "xV" anzusprechen (welche es hier nicht mal gäbe)
     * 
     * srcV bzw. srcH: 
     * Eingabeparameter des Konstruktors. Ein Platzhalten für Informationen von Außen, welche für die Ausführung notwendig ist, hier: Die Adresse des Bildes
     * Die konkrete Adresse wird dann bei der Erzeugung eines Objekts übergeben.
     */
    constructor(srcV, srcH) {
        this.xV = 0;
        this.bildV = new Image();
        this.bildV.src = srcV;

        this.bildH = new Image();
        this.bildH.src = srcH;

        /**
         * Array-Methode: Anonyme Methode, die nur an dieser Stelle benötigt wird
         * "() => {Methodenrumpf}"
         */
        this.bildV.onload = () => { this.xH = this.xV + this.bildV.width; };
    }

    bewegen = function () {
        this.xV = this.xV - 1;
        this.xH = this.xH - 1;

        /**
        * Wenn das hintere Hintergrundbild am Anfang des Canvas angekommen ist, setzen wir das vordere Hintergrundbild hinter das hintere Hintergrundbild
        * Wenn das vordere Hintergrundbild am Anfang des Canvas angekommen ist, setzen wir das hintere Hintergrundbild hinter das vordere Hintergrundbild
        * Hierfür wird eine bedingte Anweisung, die sogenannte if-Anweisung, benötigt:
        * wenn(Bedingung) dann {....ToDo1} sonst {...ToDo2} => if(Bedingung) {...ToDo1} else {....ToDo2}
        */

        if (this.xV <= -this.bildV.width) {
            this.xV = this.xH + this.bildH.width;
        }

        if (this.xH <= -this.bildH.width) {
            this.xH = this.xV + this.bildV.width;
        }
    }
}

/**
 * Die Klasse Raumschiff dient der Realisierung unseres Raumschiffes
 */
class Raumschiff {
    constructor() {
        this.x = 100;
        this.y = 100;

        this.lives = 3;
        this.leben = new Image();
        this.leben.src = "Bilder/raumschiff.png";

        this.schuesse = [];

        this.reload = true;

        /*this.bildl = new Image();
        this.bildl.src = "Bilder/raumschiffrot.png";
        
        this.deads = 0;
        this.bildd = new Image();
        this.bildd.src = "Bilder/raumschiffgrau.png";

        this.scalel = 0.05;
        this.bildl.onload = () =>{
            this.widthl = this.bildl.width * this.scalel;
            this.heightl = this.bildl.heigth * this.scalel;
        }
        this.bildd.onload = () =>{
            this.widthd = this.bildd.width * this.scalel;
            this.heightd = this.bildd.heigth * this.scalel;
        }*/
        /**
         * Geschwindigkeit!
         * v=0: Bewege mich mit der Standardgeschwindigkeit, d.h. der bewegende Hintergrund
         *      sorgt für die scheinbare Bewegung
         * v>0: Bewege mich schneller als der Hintergrund (später durch Tastendruck realsiert)
         */
        this.v = 0;
        /**
         * this.scale dient der Vergrößerung bzw. Verkleinerung des Raumschiffes, da die Bilddatei zu groß ist
         */
        this.scale = 0.15;
        this.bild = new Image();
        this.bild.src = "Bilder/raumschiff.png";


        this.bild.onload = () => {
            this.width = this.bild.width * this.scale;
            this.height = this.bild.height * this.scale;

            this.flug = new Image();
            this.flug.src = "Bilder/flug.png";

            this.gas = new Image();
            this.gas.src = "Bilder/gas.png";

            this.flug.onload = () => {
                this.fWidth = this.flug.width * this.scale * 2;
                this.fHeight = this.flug.height * this.scale * 2;
                this.fX = this.x - this.fWidth + 120 * this.scale;
                this.fY = this.y + this.height / 2 - this.fHeight / 2;

                this.flamme = this.flug;
                this.flammeX = this.fX;
                this.flammeY = this.fY;
                this.flammeWidth = this.fWidth;
                this.flammeHeight = this.fHeight;
            }

            this.gas.onload = () => {
                this.gWidth = this.gas.width * this.scale * 2;
                this.gHeight = this.gas.height * this.scale * 2;
                this.gX = this.x - this.gWidth + 120 * this.scale;
                this.gY = this.y + this.height / 2 - this.gHeight / 2;
            }


        }

    }

    move = function (r) {
        if (r == "left") {
            this.x = this.x - 5;
            this.fX = this.fX - 5;
            this.gX = this.gX - 5;
        }
        if (r == "right") {
            this.x = this.x + 5;
            this.fX = this.fX + 5;
            this.gX = this.gX + 5;
        }
        if (r == "up") {
            this.y = this.y - 5;
            this.fY = this.fY - 5;
            this.gY = this.gY - 5;
        }
        if (r == "down") {
            this.y = this.y + 5;
            this.fY = this.fY + 5;
            this.gY = this.gY + 5;
        }
    }

    gasGeben = function () {
        this.flamme = this.gas;
        this.flammeX = this.gX;
        this.flammeY = this.gY;
        this.flammeWidth = this.gWidth;
        this.flammeHeight = this.gHeight;
    }

    keinGas = function () {
        this.flamme = this.flug;
        this.flammeX = this.fX;
        this.flammeY = this.fY;
        this.flammeWidth = this.fWidth;
        this.flammeHeight = this.fHeight;
    }
    destroy = function () {
        if(this.lives > 0){
            this.lives -= 1;

        }
        else{
            gameover();
        }}
    shoot = function () {
        if(this.reload == true && this.schuesse.length < 6 && sbarUp == true){
            this.schuesse.push(new Schuss(this.x + this.width, this.y + this.height/2))
            this.reload = false;
            setTimeout(() => {/*muss noch schauen, ob das vom raumschiff oder window ausgeführt wird*/
                this.reload = true;
            }, 200)
            
        }


    }
        



    
    
}
class Daddy {
    constructor() {
        this.x = 1080;
        this.y = 360;

        this.lives = 5;
        this.leben = new Image();
        this.leben.src = "Bilder/ufo.png";

        this.schuesse = [];

        this.reload = true;

        /*this.bildl = new Image();
        this.bildl.src = "Bilder/raumschiffrot.png";
        
        this.deads = 0;
        this.bildd = new Image();
        this.bildd.src = "Bilder/raumschiffgrau.png";

        this.scalel = 0.05;
        this.bildl.onload = () =>{
            this.widthl = this.bildl.width * this.scalel;
            this.heightl = this.bildl.heigth * this.scalel;
        }
        this.bildd.onload = () =>{
            this.widthd = this.bildd.width * this.scalel;
            this.heightd = this.bildd.heigth * this.scalel;
        }*/
        /**
         * Geschwindigkeit!
         * v=0: Bewege mich mit der Standardgeschwindigkeit, d.h. der bewegende Hintergrund
         *      sorgt für die scheinbare Bewegung
         * v>0: Bewege mich schneller als der Hintergrund (später durch Tastendruck realsiert)
         */
        this.v = 0;
        /**
         * this.scale dient der Vergrößerung bzw. Verkleinerung des Raumschiffes, da die Bilddatei zu groß ist
         */
        this.scale = 0.4;
        this.bild = new Image();
        this.bild.src = "Bilder/ufo.png";


        this.bild.onload = () => {
            this.width = this.bild.width * this.scale;
            this.height = this.bild.height * this.scale;





        }

    }

    move = function () {
        this.x = this.x - 5;


    }
    destroy = function () {
        if(this.lives > 0){
            this.lives -= 1;

        }
        else{
            /*daddy tot*/;
        }}
    shoot = function () {
        /*if(this.reload == true && this.schuesse.length < 3 /* x von daddy = raumschiff x ist){
            this.schuesse.push(new Schuss(this.x + this.width, this.y + this.height/2))
            this.reload = false;
            setTimeout(() => {muss noch schauen, ob das vom raumschiff oder window ausgeführt wird
                this.reload = true;
            }, 200)
            
        }*/
        this.schuesse.push(new Schuss(this.x - this.width, this.y + this.height/2));


    }
}

class Schuss {
    constructor(startX, startY){
        this.xS = startX;
        this.yS = startY;
        this.scale = 0.3;
        
        this.bildS = new Image();
        this.bildS.src = "Bilder/rschuss.png";

       /* this.bildD = new Image();
        this.bildD.src = bild vom boss schuss;*/

        this.lives = true;

        this.bildS.onload = () => {
            this.width = this.bildS.width * this.scale;
            this.height = this.bildS.height * this.scale;
        }




    }

    move = function(){
        this.xS += 15;
        console.log("flien");
    }
    moveback = function(){
        this.xS -= 15;
    }

    


}

/*class Life{
    constructor(){
        this.x = 0;
        this.y = 0;

        this.alive = true;
        this.bild = new Image();
        this.bild.src = "Bilder/raumschiffrot.png";
        this.scale = 0.05;

        this.bild.onload = () => {
            this.width = this.bild.width * this.scale;
            this.height = this.bild.height * this.scale;
        }
    }



}*/

class UFO{ 
    constructor(){
        this.x = 1100;
        this.y = Math.random()* (690- 30) + 30;
        this.bild = new Image();
        this.bild.src = "Bilder/ufo.png";

        this.scale = 0.2;

        this.bild.onload = () => {
            this.width = this.bild.width*this.scale;
            this.height = this.bild.height*this.scale;
        }

        this.lives = true;

        
    }

    groesseSetzen = function(wert){
        this.scale = wert;
        this.width = 400*this.scale;
        this.height = 210*this.scale;
    }

    move = function(){
        this.x = this.x -5;
    }

    destroy = function(){
        this.lives = false;
        this.bild.src = "Bilder/ufo_boom.png";
    }
}
/**
 * Variablendeklaration und -initalisierung
 * Variablen direkt in der js-Datei (d.h. die dem window-Objekt zugefügt werden) gelten üerball, 
 * d.h. in allen Methoden oder außerhalb der Methoden, da diese
 * beim Aufbau der Seite durch das Objekt window erzeugt werden und diese von Anfang an kennt
 * Variablen in Methoden gelten nur hier, d.h. nicht in anderen Methoden oder außerhalb der Methoden
 * 
 */

var flipchart = document.getElementById("Canvas");
var papier = flipchart.getContext("2d");


/**
 * 	new: erzeugt neues Objekt gemäß des entsprechenden Bauplans (hier: Hintergrund),
 *  das erzeugte Objekt wird in einer Variable gespeichert (hier: hintergrund)
 *
 */

var hintergrund = new Hintergrund("Bilder/hintergrund_vorne.png", "Bilder/hintergrund_hinten.png");
var raumschiff = new Raumschiff();
var ufos = [];


/**
 * Methoden, die sich nicht in einer Klasse implementiert werden, fassen Abfolgen, die zusammenhängen, zusammen.
 * Sie werden dem Objekt window hinzugefügt und können über dieses aufgerufen werden (s.o.: mit oder ohne Punktnotation)
 * 		=>  Kein sofortiges Ausführen beim Aufbau der Seite (wie bei direkt in die js-Datei geschriebenen Quelltext),
 *          sondern nur bei Aufruf der Methode
 *      =>  Mehrmaliges Ausführen möglich, durch mehrmaliges Aufrufen der Methde
 */

/**
 * Der Aufruf der Methode starteSpiel des window-Objekts dient dem Starten des Spiels.
 * Man könnte den Aufruf der Methode starteSpiel des window-Objekts auch direkt in der js-Datei durchführen. Dann
 * wäre aber für eine kurze Zeit nicht gesichert, dass die Bilder noch nicht geladen wurden und somit nicht dargestellt
 * werden könnten (vgl. bild.onload).
 * Deshalb wird die Methode starteSpiel des window-Objekts in der zugehörigen html-Seite im body-Tag mittels onload="starteSpiel()" aufgerufen
 * Die onload Eigenschaft das bodys garantiert, dass die Methode erst aufgerufen wird, wenn alle Elemente des bodys (so auch die Bilder)
 * geladen wurden.
 */

/**
 * Die IDs dienen der Identifikation der Intervallsausführungen
 */
var hintergrundID;
var zeichnenID;
var updateID;
var erzeugeID;
var pfeilOben;
var pfeilUnten;
var pfeilRechts;
var pfeilLinks;
var sbarUp;
var hscore;
var daddy;

function starteSpiel() {
    sbarUp = true;
    hscore = 0;
    window.addEventListener("keydown", tasteRunter);
    window.addEventListener("keyup", tasteHoch);

    /**
     * setInterval(Methode, Zeit in ms) 
     * Fähigkeit des Objekts window periodisch eine Methode auszuführen, hier die Arrow-Methode, die beim Objekt "hintergrund" die Methode "bewege" aufruft - alle 10 ms
     * 
     * Liefert ID der Intervallausführung zurück, welche in einer Variable gespeichert werden sollte, 
     * falls man diese Intervallausführung später stoppen möchte
     */
    updateID = window.setInterval(() => { window.update(); }, 10);
    erzeugeID = window.setInterval(() => {ufos.push(new UFO());},1800);


    /**
     * ruft die Methode draw() auf, welche sich ausschließlich um das Zeichnen des Canvas kümmert
     */
    zeichnenID = window.zeichnen();
}

function tasteRunter(e) {
    if (e.key == "ArrowUp") {
        pfeilOben = true;
    }
    if (e.key == "ArrowDown") {
        pfeilUnten = true;
    }
    if (e.key == "ArrowRight") {
        pfeilRechts = true;
    }
    if (e.key == "ArrowLeft") {
        pfeilLinks = true;

    }
    if(e.key == " "){
        raumschiff.shoot();
        sbarUp = false;
        

    }
}

function tasteHoch(e) {
    if (e.key == "ArrowUp") {
        pfeilOben = false;
    }
    if (e.key == "ArrowDown") {
        pfeilUnten = false;
    }
    if (e.key == "ArrowRight") {
        pfeilRechts = false;
    }
    if (e.key == "ArrowLeft") {
        pfeilLinks = false;
    }
    if (e.key == " ") {
        sbarUp = true;
    }
    
}

function update() {

    if (pfeilOben == true || pfeilUnten == true || pfeilRechts == true || pfeilLinks == true) {
        raumschiff.gasGeben();
    }
    else {
        raumschiff.keinGas();
    }

    if (pfeilOben == true && raumschiff.y > 0) {
        raumschiff.move("up");
    }

    if (pfeilUnten == true && (raumschiff.y + raumschiff.height) < flipchart.height) {
        raumschiff.move("down");
    }

    if (pfeilRechts == true && (raumschiff.x + raumschiff.width) < flipchart.width) {
        raumschiff.move("right");
    }

    if (pfeilLinks == true && raumschiff.x - raumschiff.flammeWidth > 0) {
        raumschiff.move("left");
    }

    ufos.forEach((u) => {
        if(u.lives == true){
            u.move();}
        if(u.x < 0){
            var index = ufos.indexOf(u);
            ufos.splice(index,1);
            raumschiff.destroy();
        }
        if(u.lives==true&&((raumschiff.x + raumschiff.width)>=u.x)&&(raumschiff.x<=(u.x+u.width))&&((raumschiff.y+raumschiff.height)>=u.y)&&(raumschiff.y<=(u.y + u.height))){
            u.destroy();
            hscore += 1;
            /*if(hscore >= 5){
                clearInterval(erzeugeID);
                daddy = new Daddy();
                
            }*/
            raumschiff.destroy();
            var index = ufos.indexOf(u);
            setTimeout((index) => {
                ufos.splice(index,1);
            }, 1000);        

        
    }})
    
    raumschiff.schuesse.forEach((s) => {
        if(s.lives == true){
            s.move();
        }
        if(s.xS > 1080){
            var index = raumschiff.schuesse.indexOf(s);
            raumschiff.schuesse.splice(index,1);
        }
        ufos.forEach((u) => {
            if(s.lives == true && ((s.xS + s.width)>= u.x) && (s.xS<=(u.x+u.width)) && ((s.yS + s.height)>= u.y )&& (s.yS <=(u.y +u.height)) && u.lives == true){
                  u.destroy();
                hscore += 1;
                /*if(hscore >= 5){
                    clearInterval(erzeugeID);
                    daddy = new Daddy();
                    
                }*/
                var index = raumschiff.schuesse.indexOf(s);
                raumschiff.schuesse.splice(index,1);
                

                setTimeout((indexu = ufos.indexOf(u)) => {
                    ufos.splice(indexu,1);
                }, 1000); 

            }
        })
    })
    /*if(daddy != None){
        raumschiff.schuesse.forEach((s) => {
            if(s.lives == true){
                s.move();
            }
            if(s.xS > 1080){
                var index = raumschiff.schuesse.indexOf(s);
                raumschiff.schuesse.splice(index,1);
            }
            if(s.lives == true && ((s.xS + s.width) >= daddy.x) && (s.xS <= (daddy.x + daddy.width)) && ((s.yS + s.height) >= daddy.y) && s.yS <=(daddy.y +daddy.height)&& daddy.lives)
        
    })*/
    

    

    hintergrund.bewegen(); 
}


/**
* die Methode draw kümmert sich ausschließlich um das Zeichnen das Canvas
*/
function zeichnen() {
    /**
     * Löscht das papier
     */
    papier.clearRect(0, 0, flipchart.width, flipchart.height);
    papier.drawImage(hintergrund.bildV, hintergrund.xV, 0);
    papier.drawImage(hintergrund.bildH, hintergrund.xH, 0);
    papier.drawImage(raumschiff.flamme, raumschiff.flammeX, raumschiff.flammeY, raumschiff.flammeWidth, raumschiff.flammeHeight);
    papier.drawImage(raumschiff.bild, raumschiff.x, raumschiff.y, raumschiff.width, raumschiff.height);
    papier.font = "bold 48px verdana, sans-serif";
    papier.fillStyle = "red"
    papier.fillText(hscore, 1000, 100);
    for(let i=0;i<ufos.length;i=i+1){
        papier.drawImage(ufos[i].bild, ufos[i].x, ufos[i].y, ufos[i].width, ufos[i].height);
    }
    for(let i = 0 ; i < raumschiff.lives + 1; i = i +1){
        papier.drawImage(raumschiff.leben, 20 + raumschiff.leben.width * i * 0.05, 20 , raumschiff.leben.width * 0.05, raumschiff.leben.height * 0.05)
        console.log("test")
    }
    raumschiff.schuesse.forEach((s) => {
        papier.drawImage(s.bildS, s.xS, s.yS, s.width, s.height);
    })

    

    /**
     * requestAnimationFrame(Methode) 
     * Fähigkeit des Objekts window eine Methode, welche insbesondere das canvas bemalt,
     * in der Frequentierung aufzurufen,so dass die Abfolge der erzeugten Bilder als Animation wahr genommen wird.
     * Der Aufruf stellt sicher, dass die übergebene Methode (hier die draw-Methode) immer aufgerufen wird, bevor der Browser
     * sich aktualisiert (was in der Regel 60 mal pro Sekunde erfolgt).
     * Liefert ID der Animationsausführung zurück, welche in einer Variable gespeichert werden sollte, 
     * falls man diese Animationsausführung später stoppen möchte
     */
    zeichnenID = window.requestAnimationFrame(zeichnen);
}

function gameover(){
    console.log("gameover");
    cancelAnimationFrame(zeichnenID);
    clearInterval(erzeugeID);
    clearInterval(updateID);
    
    let gameover = new Image();
    gameover.src = "Bilder/gameover.png"
    gameover.onload = () => {papier.drawImage(gameover, 0,0,1080,720);}
    setTimeout(() => {
    papier.font = "bold 48px verdana, sans-serif";
    papier.fillStyle = "white";
    papier.fillText("Highscore: " + hscore, 400, 600);
    })
    
}
