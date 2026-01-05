class Interface_usuarios{
    constructor(){
        this.iniciar_botoes();
        this.usuario = null;
    }

    iniciar_botoes(){
        let cadastrar_usuario = document.getElementById("enviar");
        cadastrar_usuario.addEventListener('click', e => {
            e.preventDefault();

            var user = {
                name:document.querySelector(".nome").value,
                email:document.querySelector(".email").value,
                senha:document.querySelector(".senha").value,
                permissao:document.querySelector(".permissao").value
            }

            this.usuario = new usuarios()
            this.usuario.cadastrar_usuario(user.name, user.email, user.senha,user.permissao);
            console.log(this.usuario);
        })
    }
}

var interface_user = new Interface_usuarios();