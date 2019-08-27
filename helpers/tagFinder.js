module.exports = content => {

    content = String(content)
    let newContent = content.replace(/<\/?[^>]+(>|$)/g, "");
    let tags = content.match(/\#\w+/g)
    newContent = newContent.replace(/\#\w+/g, "<span class='tag'>$&</span>")
    

    return { content: newContent, tags: tags};
};
