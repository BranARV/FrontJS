const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeData("./img/pokemon-sad.gif",0,"Desconocido",0,0,[],[],[])
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            let i = 0;
            //Nombre, Altura, Peso
            let id = data.id;
            let name = data.name;
            let peso = data.weight;
            let altura = data.height;
            console.log(id,name,peso,altura);
            //Tipos
            let pokeTy = [];
            for (i; i < data.types.length; i++) {
                pokeTy.push(data.types[i].type.name);
                console.log(pokeTy);
            };
            //Stats
            i=0;
            let pokeStat = new Map();
            for (i; i < data.stats.length; i++) {
                pokeStat.set(data.stats[i].stat.name,data.stats[i].base_stat);
                console.log(pokeStat);
            };
            //pokeAbi
            i=0
            let pokeAbi = [];
            for (i; i < data.abilities.length; i++) {
                pokeAbi.push(data.abilities[i].ability.name);
                console.log(pokeAbi);
            };
            pokeData(pokeImg,id,name,peso,altura,pokeTy,pokeStat,pokeAbi);
            console.log(pokeImg);
        }
    });
}

const pokeData = (url,id,name,peso,altura,pokeTy,pokeStat,pokeAbi) => {
    if (id == 0){
        document.getElementById("NF").innerHTML = `
    <div class = "center">
        <h1>#${id} ${name.toUpperCase()}</h1>
        <img src=${url} alt="Pokemon" id="pokeImg" width="230px" height = "230px">
    </div>`
    }
    else{
        document.getElementById("NF").innerHTML = `
        <div class = "center">
            <h1>#${id} ${name.toUpperCase()}</h1>
            <img src=${url} alt="Pokemon" id="pokeImg" width="250px" height = "250px">
        </div>`
        document.getElementById("Data").innerHTML = `
        <div class="Data-general">
            <H3>Datos Generales </H3>
            <p>Nombre: ${name}</p>
            <p>ID: ${id}</p>
            <p>Peso: ${peso*0.4536} Kg</p>
            <p>Altura: ${altura*0.305} M</p>
        </div>
        <div class="Data-general">
            <H3>Habilidades </H3>
            ${abilities(pokeAbi)}
        </div>
        `
        document.getElementById("Stats").innerHTML = `
        <div class="Data-general">
                <H3>Estadisticas </H3>
                <p>Vida</p>
                <progress max="100" value="${pokeStat.get('hp')}"></progress>
                <p>Ataque</p>
                <progress max="100" value="${pokeStat.get('attack')}"></progress>
                <p>Defensa</p>
                <progress max="100" value="${pokeStat.get('defense')}"></progress>
                <p>Velocidad</p>
                <progress max="100" value="${pokeStat.get('speed')}"></progress>
            </div>
            <div class="Data-general">
                <H3>Tipo </H3>
                ${tipo(pokeTy)}
            </div>
        `
    }
    
}

const abilities = (pokeAbi) => {
    let i = 0;
    let ret = "";
    for(i;i<pokeAbi.length;i++){
        ret = ret + `<p>${i+1}.- ${pokeAbi[i]}</p>`
    }
    return ret;
}

const tipo = (pokeTy) => {
    let i = 0;
    let ret = "";
    for(i;i<pokeTy.length;i++){
        ret = ret + `<p>${i+1}.- ${pokeTy[i]}</p>`
    }
    return ret;
}