var globalData = [];
const postlist = document.querySelector('#postlist');


$.getJSON("./database.json")
.done(function( data ) {
    globalData = data;
});



$("#boton-buscar").click(function(){
    let term = $("#term-box").val().toLowerCase();
    $('#postlist').empty();
    let coincidences = 0;
    globalData.forEach(post => {
        text = post["content"];
        if(text.toLowerCase().includes(term)){
            coincidences++;
            if(coincidences > 9000) return;
            let div = document.createElement('div');
            div.classList.add("post-wraper");
            div.innerHTML = `
                <span class="post-details">
                    <span class="name">Anonymous</span>
                    <span class="timestamp">${post["date"]}</span>
                    <span class="post-number">No.${post["id"]}</span>
                    <a class="goto-button" target="_blank" href="https://archive.palanq.win/vt/thread/${post["father"]}/#${post["id"]}">View on archive</a>
                    <span class="yous">(You)count: ${post["youCount"]} ${post["youCount"] >=5 ? " 🔥 " : ""}</span>
                    <div class="content">
                    ${post["image"] != undefined?`<img class="image-link" src="https://archive-media.palanq.win/vt/thumb${post["image"]}" onerror="this.style.display='none'">`:""}
                    
                    <div class="text">
                        ${post["content"].replaceAll("\n", "<br>")}
                    </div>
                    </div>
                </span>
            `
            postlist.appendChild(div);
            postlist.appendChild(document.createElement('br'));
        }
    });
    $("#result").text(`Your query has been found on ${coincidences} posts!`)
});



