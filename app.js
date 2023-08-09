const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login(process.env.token);
const fetch = require("node-fetch");
const fs = require("fs");
require("express")().listen(1343);

//UPTİME

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//OYNUYOR KISMI

client.on("ready", () => {
  console.log("Bot Aktif");
  let playing = client.voice.connections.size;

  client.user.setPresence({
    activity: {
      name: "Murat",
      type: "WATCHING",
      url: "URL"
    }
  });
});

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

//embed hazırlıkları

const help = new discord.MessageEmbed()
  
  .setColor("RED")
   .setFooter(`Neon BOT UpTime Servisi | "Botumuz Sizin İsteklerinizle Güzelleşiyor!"`)
  .setImage("https://cdn.discordapp.com/attachments/807762745579274260/810057163376033792/standard_1.gif")
  .addField("» Bağlantılar", `[\<:Sonbahar:808427599306555442> Sunucuna Ekle](https://discord.com/oauth2/authorize?client_id=806276951223304203&scope=bot&permissions=1879456831) | [:ballot_box: Bota Oy Ver](LİNK) | [\<:neon:802711574501523507> Destek Sunucusu](https://discord.gg/G5vfnuvVsb) | [:newspaper: Site](https://craftneon.com/)`, false)

  .setAuthor(`Neon BOT UpTime | Yardım Menüsü`, )
  .setDescription(
  `**Uptime komudunu kullandıktan sonra sisteme eklenmesi için 3-5 dk bekleyin.**
  
\<a:Unlem:805174183835074592> ** UpTime Servisini Kullanırken \`Neon BOT'a DM\` Atarak Kullanın.**

 \<a:KirmiziDiamond:805174192609558548> **n!yardım** : Botun yardım menüsünü açar.

 \<a:YesilOkey:805174191279308821> **n!ekle <link>** : Eklediğiniz proje linkini 7/24 açık yapar.

 \<a:NeonThink:805192008963588116>  **n!göster** : Bot'umuzla uptime olan proje sayısını gösterir.

 \<a:DiscordYetkiliGF:805199983660892190> **n!botbilgi** : Bot'un istastistik verilerini gösterir.


`
      
  );

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "n!ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
          return message.channel.send(
            new discord.MessageEmbed()
                .setFooter(`Neon BOT UpTime Servisi | "Botumuz Sizin İsteklerinizle Güzelleşiyor!"`)
  .setThumbnail("https://cdn.discordapp.com/attachments/799371825507074099/810023166671716362/Neon_BOT_Logo.png.png")
              .setColor("RED")
              .setDescription(`**\<a:ReddetmekGif:805190091273142323> Bu bot zaten uptime ediliyor.**
              
                             ** Farklı Bir Glitch Linki Denermisin Bu Link Zaten Sistemime Eklendi.**
                              `)
          );
        message.channel.send(
          new discord.MessageEmbed()
              .setFooter(`Neon BOT UpTime Servisi | "Botumuz Sizin İsteklerinizle Güzelleşiyor!"`)
  .setThumbnail("https://cdn.discordapp.com/attachments/799371825507074099/810023166671716362/Neon_BOT_Logo.png.png")
            .setColor("RED")
            .addField("» Bağlantılar", `[\<:Sonbahar:808427599306555442> Sunucuna Ekle](https://discord.com/oauth2/authorize?client_id=806276951223304203&scope=bot&permissions=1879456831) | [:ballot_box: Bota Oy Ver](LİNK) | [\<:neon:802711574501523507> Destek Sunucusu](https://discord.gg/G5vfnuvVsb) | [:newspaper: Site](https://craftneon.com/)`, false)

           .setDescription(`**\<a:NeonEVET:805478484507361322> Başarılı! Projeniz artık 7/24!**
          
          Neon BOT UpTime Servisini Kullancığınız İçin Teşekkür Ederiz.
          `) 
        );
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(
          new discord.MessageEmbed()
              .setFooter(`Neon BOT UpTime Servisi | "Botumuz Sizin İsteklerinizle Güzelleşiyor!"`)
                  .setTitle("\`UpTime Servisini Kullanıcaksan Glitch Linkinden Başka Link Kullanma..\`")
  .setThumbnail("https://cdn.discordapp.com/attachments/799371825507074099/810023166671716362/Neon_BOT_Logo.png.png")
            .setColor("RED")
            .setDescription("\<a:NeonHAYIR:805479469007372358> **Hata! Sadece düzgün url'ler ekleyebilirsiniz.**")
        );
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "n!göster") {
    var link = spl[1];
    message.channel.send(
      new discord.MessageEmbed()
        .setFooter("murat")
        .setColor("RED")
        .setTitle("\<a:TurkBayragi:808432385795424266> Neon BOT UpTime  ")
        .setFooter(`Neon BOT UpTime Servisi | "Botumuz Sizin İsteklerinizle Güzelleşiyor!"`)
        .setImage("https://cdn.discordapp.com/attachments/807762745579274260/810057163376033792/standard_1.gif")
        .setDescription(`**Servisi İle Toplam** **\`${db.get("linkler").length}\`**  **Proje Uptime Ediyorum**`)
    );

  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "n!uptime") {
    var link = spl[1];
    message.channel.send(help);
  }
});

