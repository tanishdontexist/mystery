const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = client => {
  client.on("messageCreate", async message => {
    let tag1 = db.get(`server_tag_1_${message.guild.id}`);
    let tag2 = db.get(`server_tag_2_${message.guild.id}`);
    let text1 = db.get(`server_tag.text_1_${message.guild.id}`);
    let text2 = db.get(`server_tag.text_2_${message.guild.id}`);
    let tag3 = db.get(`server_tag_3_${message.guild.id}`);
    let tag4 = db.get(`server_tag_4_${message.guild.id}`);
    let text3 = db.get(`server_tag.text_3_${message.guild.id}`);
    let text4 = db.get(`server_tag.text_4_${message.guild.id}`);
    let tag5 = db.get(`server_tag_5_${message.guild.id}`);
    let text5 = db.get(`server_tag.text_5_${message.guild.id}`);

    if (!message.guild || message.author.bot) return;

    if (message.content === tag1) {
      message.channel.send(text1);
    }

    if (message.content === tag2) {
      message.channel.send(text2);
    }

    if (message.content === tag3) {
      message.channel.send(text3);
    }

    if (message.content === tag4) {
      message.channel.send(text4);
    }

    if (message.content === tag5) {
      message.channel.send(text5);
    }
  });
};
