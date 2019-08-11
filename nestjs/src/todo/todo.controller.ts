import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {TodoService} from "./todo.service";
import {CreateTodoDto} from "../../../models/dtos/todo/create-todo.dto";
import {UpdateTodoDto} from "../../../models/dtos/todo/update-todo.dto";

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {
    }

    @Get()
    query(@Query('criteria') criteria) {
        return this.todoService.all(criteria);
    }

    @Get(':id')
    get(@Param('id') id) {
        return this.todoService.get(id);
    }

    @Post()
    create(@Body() todo: CreateTodoDto) {
        return this.todoService.create(todo);
    }

    @Put(':id')
    update(@Param('id') id, @Body() todo: UpdateTodoDto) {
        return this.todoService.update(id, todo);
    }

    @Delete(':id')
    remove(@Param('id') id) {
        return this.todoService.remove(id);
    }
}
