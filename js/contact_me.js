$(function() {
    $('#sendMessageButton').click(function(){
        var name = $("input#name").val();
        if(!name){
            // Fail message
			$('#success').html("<div class='alert alert-danger'>");
			$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
			$('#success > .alert-danger').append($("<strong>").text("Por favor preencha o campo Nome"));
			$('#success > .alert-danger').append('</div>');
            return false;
        }
        name = 'Olá meu nome é ' + name + ',%0a';
        var message = $("textarea#message").val();
        if(!message){
            // Fail message
			$('#success').html("<div class='alert alert-danger'>");
			$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
			$('#success > .alert-danger').append($("<strong>").text("Por favor preencha o campo Mensagem"));
			$('#success > .alert-danger').append('</div>');
            return false;
        }

        var unified_emoji_ranges = ['\ud83c[\udf00-\udfff]','\ud83d[\udc00-\ude4f]','\ud83d[\ude80-\udeff]']; // range do regex
        var reg = new RegExp(unified_emoji_ranges.join('|'), 'g'); // Instanciado regex

        // verificando se foi encontrado para prosseguir com a conversão
        if (message.match(reg)) {
            // fazendo a conversão para o html5 e fazendo replace na frase original
            message = message.replace(reg, (v) => {
                return emojiUnicode(v);
            });
        }

        var newstr = name + message.split(' ').join('%20');
        window.open('https://wa.me/5511987447318?text=' + newstr, '_blank');
    })
});

// Função para converter C/C++/Java source code para decimal+html code
function emojiUnicode (emoji) {
	var comp;
	if (emoji.length === 1) {
		comp = emoji.charCodeAt(0);
	}
	comp = (
		(emoji.charCodeAt(0) - 0xD800) * 0x400
		+ (emoji.charCodeAt(1) - 0xDC00) + 0x10000
	);
	if (comp < 0) {
		comp = emoji.charCodeAt(0);
	}
	return '&#' + comp.toString("10");
};