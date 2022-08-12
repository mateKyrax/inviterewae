const Discord = require("discord.js");
const botconfig = require("./config.json");
const client = new Discord.Client({disableEveryone: true});
const superagent = require('superagent');
const randomPuppy = require('random-puppy');
var weather = require('weather-js');
const CoinGecko = require('coingecko-api');
const ms = require("ms");
const color = "RANDOM"
const srod = require("srod-v2");
const random = require("catsndogs");

const { Player } = require("discord-player");
const player = new Player(client);
client.player = player;






const fs = require("fs");
const money = require("./money.json");

 
    




let botname = "InviteReward"

client.on("ready", async() => {
    console.log(`${client.user.username} elindult!`)

    let státuszok = [
        "Készítő: Yuma"
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        client.user.setActivity(status, {type: "WATCHING"})
    }, 3000)
})

client.on("message", async message =>{ 
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    
       if(!money[message.author.id]) {
        money[message.author.id] = {
            money: 100,
            user_id: message.author.id

        };
    }
    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if(err) console.log(err);
    });
    let sajátpénz = money[message.author.id].money;



    if(cmd === `${prefix}shop`){
        let ShopEmbed = new Discord.MessageEmbed()
            .setTitle("Bolt")
            .setDescription(`VIP rang ${prefix}vasarolvip (15000 érme)`)
            .setColor("YELLOW")
            .setTimestamp(message.createdAt)
            .setFooter(message.author.username)

            message.channel.send(ShopEmbed);
    }


   if(cmd ===`${prefix}moneygive`){
    let give_user = message.mentions.members.first();
    if(args[0] && give_user){

        let moneygive = new Discord.MessageEmbed()
        .setTitle("Give")
        .setColor("YELLOW")
        .setDescription(`${message.author.username} adott pénzt ${give_user.user.username} nak/nek`)
        .setTimestamp(message.createdAt)
        .setFooter(message.author.username)

        message.channel.send(moneygive);

        money[message.author.id] = {
            money: sajátpénz + 15000,
            user_id: give_user.id
        }
    }
}
 
 

    if(cmd === `${prefix}vasarolvip`){
        let viprang_id = "1007360671916249198"

        let price = "15000";
        if(message.member.roles.cache.has(viprang_id)) return message.reply("*Neked ez a rang megvan!*");
        if(selfMoney < price) return message.reply(`Erre a rangra nincs pénzed! Jelenleg ${sajátpénz} érméd van.`)

        money[message.author.id] = {
            money: sajátpénz - parseInt(price),
            user_id: message.author.id
        }

        message.guild.member(message.author.id).roles.add(viprang_id);

        let vasarlos_Embed = new Discord.MessageEmbed()
        .setTitle("Vásárlás")
        .setColor("YELLOW")
        .setDescription("Sikeres vásárlás, megvetted a VIP rangot")
        .setTimestamp(message.createdAt)
        .setFooter(message.author.username)

        message.channel.send(vasarlos_Embed);

    }

if(cmd === `${prefix}work`){
    let cooldown_id = "1006825524129185802";
    let cooldown_time = "3600";

    if(message.member.roles.cache.has(cooldown_id)) return message.reply(`Ezt a parancsot ${cooldown_time} percenként használhatod!`)

    message.member.roles.add(cooldown_id)

    let üzenetek = ["Kiraboltál egy csövest,ezért", "Az égből leesett egy zsák pénz, ezért", "Elsétáltál a munkahelyedig, ezért"]
    let random_üzenet = Math.floor(Math.random()*üzenetek.length)

    let random_pénz = Math.floor(Math.random()*1000 +1)

    let workEmbed = new Discord.MessageEmbed()
    .setTitle("Munka!")
    .setDescription(`${üzenetek[random_üzenet]} kaptál **${random_pénz}** érmét!`)
    .setColor("YELLOW")
    .setTimestamp(message.createdAt)
    .setFooter(message.author.username)
    message.channel.send(workEmbed)

    money[message.author.id] = {
        money: sajátpénz + random_pénz,
        user_id: message.author.id
}

setTimeout(() => {
    message.member.roles.remove(cooldown_id)
}, 1000 * cooldown_time)
}

if(cmd ===`${prefix}bal`){
    let money = new Discord.MessageEmbed()
    .setTitle("Bal")
    .setColor("YELLOW")
    .setDescription(`Érméd: **${sajátpénz}**`)
    .setTimestamp(message.createdAt)
    .setFooter(message.author.username)

    message.channel.send(money);
}

//////////////////////////////////////////////////

    
    
    
    
    
    
   
    
    
    
    
 if(cmd ===`${prefix}wasted`){
    const user1 = message.mentions.users.first() || message.client.users.cache.get(args[0])
   

    if (args[0] && user1) {
    const Data = await srod.Wasted({Image: user1.displayAvatarURL({ dynamic: "true", size: 1024, format: "png"}), Color: color})
 
    message.channel.send(Data);
     } else {
        const Data = await srod.Wasted({Image: message.author.displayAvatarURL({ dynamic: "true", size: 1024, format: "png"}), Color: color})
 
         message.channel.send(Data);
         } 
 }
     
    
    
     
       if(cmd ===`${prefix}glass`){
    const user1 = message.mentions.users.first() || message.client.users.cache.get(args[0])
   

    if (args[0] && user1) {
    const Data = await srod.Glass({Image: user1.displayAvatarURL({ dynamic: "true", size: 1024, format: "png"}), Color: color})
 
    message.channel.send(Data);
     } else {
        const Data = await srod.Glass({Image: message.author.displayAvatarURL({ dynamic: "true", size: 1024, format: "png"}), Color: color})
 
         message.channel.send(Data);
         } 
 }
    
      if(cmd ===`${prefix}bagett`){
        const user1 = message.mentions.users.first() || message.client.users.cache.get(args[0])
       
    
        if (args[0] && user1) {
        const Data = await srod.Baguette({Image: user1.displayAvatarURL({ dynamic: "true", size: 1024, format: "png"}), Color: color})
     
        message.channel.send(Data);
         } else {
            const Data = await srod.Baguette({Image: message.author.displayAvatarURL({ dynamic: "true", size: 1024, format: "png"}), Color: color})
     
             message.channel.send(Data);
             } 
     }
    

    
    if(cmd === `${prefix}szavazás`){
        message.delete()
        if(message.member.hasPermission("MANAGE_MESSAGES")){
            if(message.guild.member(client.user).hasPermission("ADMINSTRATOR")){

        if(args[0]){
            let he_embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag + `| Szavazást indított!`)
                .setDescription(args.join(" "))
                .setColor("YELLOW")
                .setTimestamp(message.createdAt)
                .setFooter(client.user.username)

                message.channel.send(he_embed).then(async msg =>{
                    await msg.react("✅")
                    await msg.react("❌")
                })

            } else message.reply("A botnak nincsen Adminisztrációs joga")
    
            } else message.reply("Ehhez nincs jogod")

        } else {
            message.reply("Kérlek add meg a szavazást!")
        }
    }
    
     if(cmd ===`${prefix}cat`){

        random.cat().then(url => message.channel.send(url)).catch(err => console.log(err.message));

     }

     if(cmd ===`${prefix}dog`){

        random.dog().then(url => message.channel.send(url)).catch(err => console.log(err.message));
     }
    
 if(cmd ===`${prefix}gay`){
    const user1 = message.mentions.users.first() || message.client.users.cache.get(args[0])
   

    if (args[0] && user1) {
    const Data = await srod.Gay({Image: user1.displayAvatarURL({ dynamic: "true", size: 1024, format: "png"}), Color: color})
 
    message.channel.send(Data);
     } else {
        const Data = await srod.Gay({Image: message.author.displayAvatarURL({ dynamic: "true", size: 1024, format: "png"}), Color: color})
 
         message.channel.send(Data);
         } 
 }
     if(cmd ===`${prefix}triggered`){
    const user1 = message.mentions.users.first() || message.client.users.cache.get(args[0])
   

    if (args[0] && user1) {
    const Data = await srod.Triggered({Image: user1.displayAvatarURL({ dynamic: "true", size: 1024, format: "png"}), Color: color})
 
    message.channel.send(Data);
     } else {
        const Data = await srod.Triggered({Image: message.author.displayAvatarURL({ dynamic: "true", size: 1024, format: "png"}), Color: color})
 
         message.channel.send(Data);
         } 
 }
    if(cmd ===`${prefix}threats`){
    const user1 = message.mentions.users.first() || message.client.users.cache.get(args[0])
   

    if (args[0] && user1) {
    const Data = await srod.Threats({Image: user1.displayAvatarURL({ dynamic: "true", size: 1024, format: "png"}), Color: color})
 
    message.channel.send(Data);
     } else {
        const Data = await srod.Threats({Image: message.author.displayAvatarURL({ dynamic: "true", size: 1024, format: "png"}), Color: color})
 
         message.channel.send(Data);
         } 
 }

      
    
    
    
    
    
    if(cmd === `${prefix}membercount`){
    message.channel.bulkDelete(1);

    let memberEmbed = new Discord.MessageEmbed()
    .setTitle("MemberCount")
    .setColor("YELLOW")
    .setDescription(`Az **${message.guild.name}** szerveren **${message.guild.memberCount}** ember van bent!`)
    .setTimestamp(message.createdAt)
    .setFooter(message.guild.name)

    message.channel.send(memberEmbed);

}

if(cmd === `${prefix}tgfok`){
        message.delete()
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Nincs jogod használni ezt parancsot!❌")
        let fdagfdaGDGAgdgdsg = message.mentions.members.first()
        message.channel.send(`<@${fdagfdaGDGAgdgdsg.id}> A beküldött űrlapod alapján alkalmasnak találtunk egy szóbeli meghallgatásra, kérlek nyiss egy ticketet!✅`)
    }


    if(cmd === `${prefix}tgfnem`){
        message.delete()
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Nincs jogod használni ezt parancsot!❌")
        let fdagfdaGDGAgdgdsg = message.mentions.members.first()
        message.channel.send(`<@${fdagfdaGDGAgdgdsg.id}> A beküldött űrlapod alapján sajnos alkalmatlannak találtunk a pozíció betöltésére!❌`)
    }

    
    if(cmd ===`${prefix}howgay`){

    let gay__szam = Math.floor(Math.random()*100 + 1);
    let gay_user = message.mentions.members.first();

    if(args[0] && gay_user){

        let gayEmbed = new Discord.MessageEmbed()
        .setTitle(`Howgay`)
        .setColor("RANDOM")
        .setDescription(`:rainbow_flag:  **${gay_user.user.username}** Ennyire meleg: ${gay__szam}%`)
        .setTimestamp(message.createdAt)
        .setFooter("InviteReward")

        message.channel.send(gayEmbed);
    } else {
        let gay2Embed = new Discord.MessageEmbed()
        .setTitle("Howgay")
        .setColor("RANDOM")
        .setDescription(`:rainbow_flag: Ennyire vagy meleg: ${gay__szam}%`)
        .setTimestamp(message.createdAt)
        .setFooter("InviteReward")

        message.channel.send(gay2Embed);
}
    

}



if(cmd ===`${prefix}kérdés`){
        if(args[0]){

            let valaszok = [
                "Ne bízd el magad",
                "Természetesen!",
                "Egyáltalán nem",
                "Kérdezz más valakit",
                "Szerintem ja",
                "Általában igen",
                "Néha",
                "Talán nem",
                "misztikusan"
            ]
    
            let ballEmbed = new Discord.MessageEmbed()
            .setTitle("kérdés")
            .setColor("YELLOW")
            .setDescription(valaszok[Math.floor(Math.random()* valaszok.length)])
            .setTimestamp(message.createdAt)
            .setFooter(client.user.username)
    
            message.channel.send(ballEmbed);
    
    
    
        } else {
            let ball2Embed = new Discord.MessageEmbed()
            .setTitle("HIBA | Helyes Használat")
            .setColor("YELLOW")
            .setDescription("!kérdés <kérdés>")
            .setTimestamp(message.createdAt)
            .setFooter(message.author.username)
    
            message.channel.send(ball2Embed);
        }
    
    }



    if(cmd ===`${prefix}embedsay`){
        message.channel.bulkDelete(1);
        
        if(message.member.hasPermission("KICK_MEMBERS")){
            if(args[0]){
                let say_embed = new Discord.MessageEmbed()
                .setDescription(args.join(" "))
                .setColor("YELLOW")
                .setTimestamp(message.createdAt)
                .setFooter(message.author.username)
    
                message.channel.send(say_embed);
            } else {
                let asd = new Discord.MessageEmbed()
                .setAuthor("HIBA | Helyes Használat")
                .setColor("YELLOW")
                .setDescription(`!embedsay <szöveg>`)
                .setTimestamp(message.createdAt)
                .setFooter(message.author.username)
    
                message.channel.send(asd);
            }
        } else { let asd2 = new Discord.MessageEmbed()
        .setAuthor("HIBA")
        .setColor("YELLOW")
        .setDescription("Neked ehhez nincsen jogod!")
        .setTimestamp(message.createdAt)
        .setFooter(message.author.username)
    
        message.channel.send(asd2);
    }
    




    }


    if(cmd ===`${prefix}ban`){

        if(message.member.hasPermission("BAN_MEMBERS")){
            let ban_user = message.mentions.members.first();
            if(args[0] && ban_user){
    
                if(args[1]){
    
    
    
    
    
                message.channel.send(`${ban_user} ki lett banolva!`);
                message.ban_user.send(args.slice(1).join(" "));
    
                ban_user.ban({reason: "kilettél banolva." });
    
    
            } 
    
    
        } else {
            message.channel.send("Hiba, kérlek említs meg egy embert!");
        }
    
    
    
    
    
            } else {
                message.channel.send("Hiba kérlek adj meg egy indokot!")
            }
        } 

        if(cmd ===`${prefix}btc`){

        const CoinGeckoClient = new CoinGecko();
        var data = await CoinGeckoClient.simple.price({
            ids: ['bitcoin'],
            vs_currencies: ['huf'],
        });
        console.log(data)

        let btcEmbed = new Discord.MessageEmbed()
        .setAuthor("BTC")
        .setColor("YELLOW")
        .setDescription(`:coin: A **Bitcoin** jelenlegi ára: **${data.data.bitcoin.huf}FT**`)

        message.channel.send(btcEmbed);

    }


        if(cmd ===`${prefix}giveaway`){


        message.channel.bulkDelete(1);

        const messageArray = message.content.split(" ");
            if(!message.member.hasPermission("KICK_MEMBERS" || "BAN_MEMBERS")) return message.channel.send("Ehhez a parancshoz nincs jogod!")

            let tárgy = "";
            let idő;
            let winnerCount;
            let igény = "**nincs**";

            for (let i = 1; i < args.length; i++){
                tárgy += (args[i] + " ")
                console.log(tárgy)
            }

            idő = args[0];

        if(!idő){
            return message.reply("Kérlek adj meg egy idő intervallumot! pl: 100s, 5h, 2d")
        }
        if(!tárgy){
            return message.reply("Kérlek add meg a nyereményjáték tárgyát!")
        }

        var Gembed = new Discord.MessageEmbed()     
        .setColor("YELLOW")
        .setTitle(":small_blue_diamond:  Nyereményjáték!")
        .setDescription(`:small_blue_diamond:  Nyeremény: **${tárgy}**`)
        .addField(":small_blue_diamond:  `Időtartam:`" + ms(ms(idő), {long: true}), ":small_blue_diamond:  `Igények:`" +  igény)
        .setFooter("A jelentkezéshez reagálj ezzel: 🎉")
        var embedSend = await message.channel.send(Gembed);
        embedSend.react("🎉");

        setTimeout(async() => {
            try{
                const peopleReactedBOT =  await embedSend.reactions.cache.get("🎉").users.fetch();
                var peopleReacted = peopleReactedBOT.array().filter(u => u.id !== client.user.id);
            }catch(e){
                return message.channel.send(`Hiba törtét a **${tárgy}** sorsolása során! Hiba: `+"`"+e+"`")
            }
            var winner;

            if(peopleReacted.length <= 0){
                return message.channel.send("Senki nem jelentkezett a nyereményjátékra! :C")
            } else {
                var index = Math.floor(Math.random() * peopleReacted.length);
                winner = peopleReacted[index]
            }

            if(!winner) {
                message.channel.send("Hiba történt a sorsolás során!")
            } else {
                message.channel.send(`A nyertes: **${winner.toString()}** megnyerte ezt: **${tárgy}**`);
            }
        }, ms(idő))
    }

        if(cmd ===`${prefix}help`){
        let helpEmbed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle("Segítség")
        .addField("Parancsok:", "˘˘˘")
        .addField(`${prefix}giveaway`, "Nyereményjáték létrehozása! (/giveaway (idő) nyereményjáték tárgya).")
        .addField(`${prefix}membercount`, "Megmutattja mennyi játékos található a szerveren!")
        .addField(`${prefix}javaslat`, "Leadja a szerverre a javaslatodat! (/javaslat [ötleted]).")
        .addField(`${prefix}chattörlés`, "1 és 100 között törli az üzeneteket (/chattörlés 65) töröl 65 üzenettet.")
        .addField(`${prefix}kick <@név>`, "Ember kickelése.")
        .addField(`${prefix}ban <@név>`, "Ember bannolása.")
        .addField(`${prefix}weather`, "lekéri a város időjárását (/weather Budapest).")
        .addField(`${prefix}tgfok`, "tgf elfogadása")
        .addField(`${prefix}tgfnem`, "tgf elutasítása")
        .addField(`${prefix}mute <@név> <3m, 5m, 15m, 30m, 1h>`, "Ember mutolása (meghatározott időre!)")
        .addField(`${prefix}embedsay`, "embedsay-be fog írni a bot (amit te írtál bele)")
        .addField(`${prefix}btc`, "bitcoin jelenlegi árfolyama (Forintba)")
        .addField(`${prefix}luck`, "Kiír egy szerencse százalékot!")
        .addField(`${prefix}kérdés`, "Ha valamit kérdezel a bottol add egy random választ!")
        .addField(`${prefix}meme`, "Lekér egy random mémet")
        .addField(`${prefix}report`, "Játékos jelentése")
        .addField(`${prefix}roles`, "Reakció rangok lekérése")
        .addField(`${prefix}say`, "A bot nevében írsz")
        .addField(`${prefix}verify`, "Kiküldi a fehérlistában lévő üzenetet")
        .addField(`${prefix}cca`, "Teljes beszélgetés törlése")
        .addField(`${prefix}howgay`, "Kiír egy random százélok, hogy mennyire vagy meleg")
        .addField(`${prefix}play`, "Ha bent vagy egy csatornában akkor belép a bot és amilyen zenét megadtál azt lejátsza")
        .addField(`${prefix}queue`, "Kiírja milyen zenék vannak várólistán")
        .addField("Ha valami elírást/helyesírási hibát tapasztalsz akkor keresd fel --> matebajnok#8576-ot", "^^^")
        .setTimestamp(message.createdAt)
        .setFooter(botname)
    
        message.author.send(helpEmbed);
       
    } 

if(cmd ===`${prefix}luck`){

    let luck__szam = Math.floor(Math.random()*100 + 1);
    let luck_user = message.mentions.members.first();
    if(args[0] && luck_user){

    let luck2Embed = new Discord.MessageEmbed()
    .setTitle("Luck")
    .setColor("GREEN")
    .setDescription(`:four_leaf_clover: ${luck_user.user.username} ennyire szerencsés: ${luck__szam}`)
    .setTimestamp(message.createdAt)
    .setFooter(botname)

    message.channel.send(luck2Embed);
} else {
    let luck1Embed = new Discord.MessageEmbed()
    .setTitle("Luck")
    .setColor("GREEN")
    .setDescription(`:four_leaf_clover: ennyire vagy szerencsés: ${luck__szam}`)
    .setTimestamp(message.createdAt)
    .setFooter(botname)

    message.channel.send(luck1Embed);
}

}

    if(cmd ===`${prefix}meme`){
        const subreddits = ["dankmeme", "meme", "me_irl"]
        const random = subreddits[Math.floor(Math.random() * subreddits.length)]
    
        const IMG = await randomPuppy(random)
        const MemeEmbed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setImage(IMG)
        .setURL(`https://www.reddit.com/r/${random}`)
    
        message.channel.send(MemeEmbed)
    }

 if(cmd ===`${prefix}mute`){
    let mute_user = message.mentions.members.first();
   if(args[0] && mute_user){

   let tárgy = "";
   let idő;

   idő = args[1];
   tárgy = args[2];

   if(!idő){
       return message.reply("Kérlek add meg mennyi időre szeretnéd némítani!")
   }
   if(!tárgy){
       return message.reply("Kérlek adj meg egy indokot!")
   }


       if(mute_user){

           let mute_role = "999690858486055053";
           let tag_role = "1005071146728833114";

           
           mute_user.roles.add(mute_role);
           mute_user.roles.remove(tag_role);
           message.channel.send(`${mute_user} le lett mutolva!\n ennyi időre:${ms(ms(idő), {long: true})}\n indok:${tárgy}`);

   

       }

       let mute_role = "999690858486055053";
       let tag_role = "1005071146728833114";

       setTimeout(function () {
           mute_user.roles.remove(mute_role);
           mute_user.roles.add(tag_role);





       }, ms(args[1]));
   







   }





}

    if(cmd ===`${prefix}javaslat`){
        message.channel.bulkDelete(1);

            let ötlet_channel = "999359704654426193";
            let ötEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag)
            .setTitle("Javaslata")
            .setColor("YELLOW")
            .setTimestamp(message.createdAt)
            .setDescription(args.join(" "))
            .setFooter(message.author.username)
        
            client.channels.cache.get(ötlet_channel).send(ötEmbed).then(async msg => {
                await msg.react("✅");
                await msg.react("❌");



            });
        


    }

    if(cmd ===`${prefix}report`){
        message.channel.bulkDelete(1);

        if(args[0] && message.mentions.members.first() && args[1]){

            message.channel.send("A reportodat sikeresen elküldtük!")
    
            let report_channel = "1005109820480819250";
    
            let report_embed = new Discord.MessageEmbed()
                .setAuthor(message.mentions.members.first().user.tag + `| Reportolva lett`)
                .setDescription("Report indoka:" + args.join(" ").slice(args[0].length))
                .addField("Reportolta:", message.author.tag)
                .setColor("YELLOW")
                .setTimestamp(message.createdAt)
                .setFooter(client.user.username)
    
                client.channels.cache.get(report_channel).send(report_embed);
    
        } else {
            let prefix = "!";
            let he_embed = new Discord.MessageEmbed()
                .setAuthor("HIBA | Helyes Használat")
                .setDescription(`${prefix}report @<név> <indok>`)
                .setColor("YELLOW")
                .setTimestamp(message.createdAt)
                .setFooter(message.author.username)
    
                message.channel.send(he_embed);
        }
    
    








    }


    if(cmd ===`${prefix}roles`){
        message.channel.bulkDelete(1);

        let role1 = "1005132569773346878";
        let role2 = "1005132826393444503";
        let role3 = "1005133184033374288";
    
        const emoji1 = `🎉`;
        const emoji2 = `🛠`;
        const emoji3 = `📢`;
        const channel = "1005133609721667684"
    
        let roleEmbed = new Discord.MessageEmbed()
        .setTitle("Értesítések")
        .setColor("YELLOW")
        .setDescription("🎉**Giveaway** ping\n 🛠**Frissítések** ping\n 📢**Hírek** ping")
        .setTimestamp(message.createdAt)
        .setFooter(message.author.username)
    
         message.channel.send(roleEmbed).then(async msg => {
            await msg.react("🎉");
            await msg.react("🛠");
            await msg.react("📢");
        client.on(`messageReactionAdd`, async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
    
            if(reaction.message.channel.id == channel) {
                if(reaction.emoji.name === emoji1) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(role1);
                }
            
            }
        });
    
        client.on(`messageReactionRemove`, async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction-fetch();
            if(user.bot) return;
    
            if(reaction.message.channel.id == channel) {
                if(reaction.emoji.name === emoji1) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(role1);
                }
            }
        });
    
        client.on(`messageReactionAdd`, async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
    
            if(reaction.message.channel.id == channel) {
                if(reaction.emoji.name === emoji2) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(role2);
                }
            
            }
        });
    
        client.on(`messageReactionRemove`, async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction-fetch();
            if(user.bot) return;
    
            if(reaction.message.channel.id == channel) {
                if(reaction.emoji.name === emoji2) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(role2);
                }
            }
        });
    
        client.on(`messageReactionAdd`, async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
    
            if(reaction.message.channel.id == channel) {
                if(reaction.emoji.name === emoji3) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(role3);
                }
            
            }
        });
    
        client.on(`messageReactionRemove`, async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction-fetch();
            if(user.bot) return;
    
            if(reaction.message.channel.id == channel) {
                if(reaction.emoji.name === emoji3) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(role3);
                }
            }
        });
    
        
    
            
            
            
         }) 
    
    
    
    
    
    
    
    
    
    
    
      }
    
    
    
    
        if(cmd === `${prefix}kick`){
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Ehhez nincs jogod!")   
             let kick_user = message.mentions.members.first();
             if(args[0] && kick_user){
     
                 if(args[1]){
     
                     let KickEmbed = new Discord.MessageEmbed()
                     .setTitle("KICK")
                     .setColor("RED")
                     .setDescription(`**Kikelő:** ${message.author.tag}\n**Kickelve lett** ${kick_user.user.tag}\n**Kick indoka** ${args.slice(1).join(" ")}`)
     
                 message.channel.send(KickEmbed);
     
                     kick_user.kick(args.slice(1).join(" "));
     
                 } else {
                 let parancsEmbed = new Discord.MessageEmbed()
                 .setTitle("Parancs használata:")
                 .addField(`\`${prefix}kick <@név> [indok]\``, "˘˘˘")
                 .setColor("BLUE")
                 .setDescription("HIBA: Kérlek adj meg egy indokot!!")
     
                 message.channel.send(parancsEmbed);
                 }
     
             } else {
                 let parancsEmbed = new Discord.MessageEmbed()
                 .setTitle("Parancs használata:")
                 .addField(`\`${prefix}kick <@név> [indok]\``, "˘˘˘")
                 .setColor("BLUE")
                 .setDescription("HIBA: Kérlek említs meg egy embert!")
     
                 message.channel.send(parancsEmbed);
     
             }
         }



      if(cmd ===`${prefix}say`){
        message.channel.bulkDelete(1);

   
    let szöveg = args.join(" ");

    message.channel.send(szöveg);

    }

    if(cmd ===`${prefix}verify`){
        message.channel.bulkDelete(1);

        let botname = ":gift: | Invite Rewards";
        let channel1 = "997546379578720308";

        let emoji1 = "✅";
        let role1 = "1005071146728833114";

        let verifyEmbed = new Discord.MessageEmbed()

        .setAuthor("Fehérlista")
        .setColor("YELLOW")
        .setDescription("Ezennel ﻿az 🎁 | Invite Rewards szabályzatát elfogadom, s vállalom a szankciókat! (Ha elfogadod több csatornát is láthatsz mellesleg megkapod a tag rangot!) ✅")
        .setTimestamp(message.createdAt)
        .setFooter(client.user.username)

        message.channel.send(verifyEmbed).then(async msg => {
            await msg.react("✅");
        client.on(`messageReactionAdd`, async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
    
            if(reaction.message.channel.id == channel1) {
                if(reaction.emoji.name === emoji1) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(role1);
                }
            
            }
        });
    
        client.on(`messageReactionRemove`, async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction-fetch();
            if(user.bot) return;
    
            if(reaction.message.channel.id == channel1) {
                if(reaction.emoji.name === emoji1) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(role1);
                }
            }
        });



    })



    }



    



    if(cmd ===`${prefix}weather`){
        if(args[0]){
            weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
                if (err) message.reply(err);

                if(result.length === 0){
                    message.reply("Kérlek adj meg egy létező település nevet!")
                    return;
                }

                let current = result[0].current;
                let location = result[0].location;

                let WeatherEmbed = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Időjárás itt: ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor("YELLOW")
                .addField("Időzóna:", `UTC${location.timezone}`, true)
                .addField("Fokozat típusa:", `${location.degreetype}`, true)
                .addField("Hőfok", `${current.temperature}°C`, true)
                .addField("Hőérzet:", `${current.feelslike}°C`, true)
                .addField("Szél", `${current.winddisplay}`, true)
                .addField("Páratartalom:", `${current.humidity}%`, true)

                message.channel.send(WeatherEmbed);
            })

        } else {
            message.reply("Kérlek adj meg egy település nevet!")
        }
    
}
    
    
if(cmd === `${prefix}cca`){
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  }    

    if(cmd === `${prefix}cc`){
        if(message.member.hasPermission("MANAGE_MESSAGES")){
            if(message.guild.member(client.user).hasPermission("ADMINSTRATOR")){
    
                if(args[0] && isNaN(args[0]) && args[0] <= 100 || 0 < args[0] && args[0] < 101){
    
                    message.channel.send(`${Math.round(args[0])}`)
                    message.channel.bulkDelete(Math.round(args[0]))
    
            } else {
                message.reply(`Használat: ${prefix}chattörlés <1-100>`)
            }
                
            } else message.reply("A botnak nincsen Adminisztrációs joga")
    
            } else message.reply("Ehhez nincs jogod")
        }    
    
    
 if(cmd === `${prefix}play`){
    if(!message.member.voice.channel) return message.reply("Kérlek lépj be egy hangcsatornába")
    if(message.guild.me.voice.channel && message.member.voice.channel.id !==  message.guild.me.voice.channel.id) return message.reply("Te nem vagy velem egy voice csatornában!")
    if(!args[0]) return message.reply("Kérlek adj meg egy zenét!")

    client.player.play(message, args.join(" "), {firstResult: true});

    message.channel.send(`Bekapcsoltál egy nagyon kemény zenét`);
}
    
    if(cmd === `${prefix}queue`){
    if(!message.member.voice.channel) return message.reply("Kérlek lépj be egy hangcsatornába")
    if(message.guild.me.voice.channel && message.member.voice.channel.id !==  message.guild.me.voice.channel.id) return message.reply("Te nem vagy velem egy voice csatornában!")

    const queue = client.player.getQueue(message);

    if(!client.player.getQueue(message)) return message.reply("A várólistán nincs egy zene sem")

    message.channel.send(`**Várólista - ${message.guild.name}\nJelenleg ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
        return `**#${i + 1}** - ${track.title} | ${track.author} (A zenét kérte: ${track.requestedBy.username})`

    }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `és még **${queue.tracks.length - 5}db zene...` : `A lejátszási listában: **${queue.tracks.length}db zene van.`}`
     ));
}


      
      
    


    

    
        
    
    


    
    

        
        






    
    






  






   









})


client.login(process.env.BOT_TOKEN);

