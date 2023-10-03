import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/user";

export const cadastrarUsuario = async (req: Request, res: Response) => {
    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.cpf = req.body.cpf;

        await AppDataSource.getRepository(User).save(user);

        return res.status(200).json({ ok: true, message: "Usuário cadastrado com sucesso" });
    } catch (error) {
        console.log(error, "Erro ao cadastrar o usuário.");
        return res.status(500).json({ ok: false, message: "Erro ao cadastrar usuário" });
    }
}

export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const users = await AppDataSource.getRepository(User).find();
        return res.status(200).json({ ok: true, users: users });
    } catch (error) {
        console.log(error, "Erro ao listar os usuários.");
        return res.status(500).json({ ok: false, message: "Erro ao listar usuários" });
    }
}

export const atualizarUsuario = async (req: Request, res: Response) => {
    const id = req.params.user_id;

    try {
        const user = await AppDataSource.getRepository(User).findOne({
            where: { id: parseInt(id) },
        });

        if (!user) {
            return res.status(404).json({ ok: false, message: "Não existe usuário com este ID" });
        }

        if (req.body.name) {
            user.name = req.body.name;
        }

        if (req.body.email) {
            user.email = req.body.email;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        if (req.body.cpf) {
            user.cpf = req.body.cpf;
        }

        await AppDataSource.getRepository(User).save(user);

        return res.status(200).json({ ok: true, message: "Usuário atualizado com sucesso" });
    } catch (error) {
        console.log(error, "Erro ao atualizar usuário.");
        return res.status(500).json({ ok: false, message: "Erro ao atualizar usuário" });
    }
};

export const deletarUsuario = async (req: Request, res: Response) => {
    const id = req.params.user_id;

    try {
        const user = await AppDataSource.getRepository(User).findOne({
            where: { id: parseInt(id) },
        });

        if (!user) {
            return res.status(404).json({ ok: false, message: "Não existe usuário com este ID" });
        }

        await AppDataSource.getRepository(User).delete(user);

        return res.status(200).json({ ok: true, message: "Usuário deletado com sucesso" });
    } catch (error) {
        console.log(error, "Erro ao deletar usuário.");
        return res.status(500).json({ ok: false, message: "Erro ao deletar usuário" });
    }
};