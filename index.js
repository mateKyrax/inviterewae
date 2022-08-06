const Discord = require("discord.js");
const tokenfile = require("./tokenfile.json");
const botconfig = require("./config.json");
const client = new Discord.Client({disableEveryone: true});
const superagent = require('superagent');
const randomPuppy = require('random-puppy');
var weather = require('weather-js');
const CoinGecko = require('coingecko-api');






const fs = require("fs");
const ms = require("ms");


//////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////




let botname = "Citrom"

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
        .setColor("RED")
        .setDescription("Neked ehhez nincsen jogod!")
        .setTimestamp(message.createdAt)
        .setFooter(message.author.username)
    
        message.channel.send(asd2);
    }
    




    }

    if(cmd ===`${prefix}avatar`){

        let teszt_1 = new Discord.MessageEmbed()
        .setImage(message.kick_user.displayAvatarURL({dynamic: true}))
    
        message.channel.send(teszt_1);
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
        .setFooter("A jelentkezéshe reagálj ezzel: 🎉")
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
        .addField("`\`Kategóriák:\n fun\n moderációs\n egyéb\``")
        .setTimestamp(message.createdAt)
        .setFooter(botname)
    
        message.author.send(helpEmbed);
       
    } 

    if(cmd ===`${prefix}luck`){
        let luck_szam = Math.floor(Math.random()*100 + 1);

        let luckEmbed = new Discord.MessageEmbed()
        .setAuthor("Luck")
        .setTitle(`:four_leaf_clover: Ennyire vagy szerencsés: ${luck_szam}%`)
        .setColor("YELLOW")
        .setTimestamp(message.createdAt)
        .setFooter(message.author.username)

        message.channel.send(luckEmbed);




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

                
                mute_user.roles.add(mute_role);
                message.channel.send(`${mute_user} le lett mutolva!\n ennyi időre:${ms(ms(idő), {long: true})}\n indok:${tárgy}`);

        

            }

            let mute_role = "999690858486055053";

            setTimeout(function () {
                mute_user.roles.remove(mute_role);





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
        .setDescription("🎉**Giveaway** rang\n 🛠**Frissítések** rang\n 📢**Hírek** rang")
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

    
if(cmd === `${prefix}howgay`){
let howgay_szam = Math.floor(Math.random()*100 + 1);

let howgayEmbed = new Discord.MessageEmbed()
.setTitle("Howgay")
.setColor("RANDOM")
.setDescription(`:rainbow_flag: Ennyire vagy meleg ${howgay_szam}%`)
.setTimestamp(message.createdAT)
.setFooter(message.author.username)

message.channel.send(howgayEmbed);
}


      
      
    


    

    
        
    
    


    
    

        
        






    
    






  






   









})


client.login(tokenfile.token);

