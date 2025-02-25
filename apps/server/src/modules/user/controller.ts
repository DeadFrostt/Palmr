import { AvatarService } from "./avatar.service";
import { UpdateUserSchema, createRegisterUserSchema } from "./dto";
import { UserService } from "./service";
import { MultipartFile } from "@fastify/multipart";
import { FastifyReply, FastifyRequest } from "fastify";

export class UserController {
  private userService = new UserService();
  private avatarService = new AvatarService();

  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const schema = await createRegisterUserSchema();
      const input = schema.parse(request.body);
      const user = await this.userService.register(input);
      return reply.status(201).send({ user, message: "User created successfully" });
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async listUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await this.userService.listUsers();
      return reply.send(users);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const user = await this.userService.getUserById(id);
      return reply.send(user);
    } catch (error: any) {
      return reply.status(404).send({ error: error.message });
    }
  }

  async updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const input = UpdateUserSchema.parse(request.body);
      const { id, ...updateData } = input;
      const updatedUser = await this.userService.updateUser(id, updateData);
      return reply.send(updatedUser);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async activateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const user = await this.userService.activateUser(id);
      return reply.send(user);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async deactivateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const user = await this.userService.deactivateUser(id);
      return reply.send(user);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const user = await this.userService.deleteUser(id);
      return reply.send(user);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async updateUserImage(request: FastifyRequest, reply: FastifyReply) {
    try {
      const input = UpdateUserSchema.parse(request.body);
      const { id, ...updateData } = input;
      const updatedUser = await this.userService.updateUser(id, updateData);
      return reply.send(updatedUser);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async uploadAvatar(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).user?.userId;
      if (!userId) {
        return reply.status(401).send({ error: "Unauthorized" });
      }

      const file = (request.body as any).file as MultipartFile;
      if (!file) {
        return reply.status(400).send({ error: "No file uploaded" });
      }

      const buffer = await file.toBuffer();
      const imageUrl = await this.avatarService.uploadAvatar(userId, buffer);
      const updatedUser = await this.userService.updateUserImage(userId, imageUrl);
      return reply.send(updatedUser);
    } catch (error: any) {
      console.error("Upload error:", error);
      return reply.status(400).send({ error: error.message });
    }
  }

  async removeAvatar(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).user?.userId;
      if (!userId) {
        return reply.status(401).send({ error: "Unauthorized" });
      }

      const user = await this.userService.getUserById(userId);
      if (user.image) {
        await this.avatarService.deleteAvatar(user.image);
        const updatedUser = await this.userService.updateUserImage(userId, null);
        return reply.send(updatedUser);
      }

      return reply.send(user);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }
}
