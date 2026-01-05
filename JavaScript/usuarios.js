class usuarios{
    constructor(nome,email,senha,permissao){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.permissao = permissao;
    }

    async cadastrar_usuario(){
        const response = await fetch('http://localhost:3000/inserir-usuarios',{
            method:'POST',
            headers:{
                'Content-Type':'application/Json'
            },
            body:JSON.stringify({
                name:this.nome,
                email:this.email,
                password:this.senha,
                role: this.permissao
            })
        });

        if(!response.ok){
            throw new Error('Erro ao criar usuario');
        }

        const data = await response.json();
        console.log('Usuario criado',data)
    }
}