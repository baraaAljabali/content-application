
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CmsService } from './cms.service';
import { Content , ContentKey} from './dto/content.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtGuard)
@Controller('cms')
export class CmsController {
  constructor(private readonly CmsService: CmsService) {}

    @Get("all")
    get_all() {
        return this.CmsService.findAll();
    }

    @Get("discover")
    discover(@Query('query') query: string) {
        return this.CmsService.discover(query);
    }

    @Post('add-content')
    add_content(@Body() content: Content) {
        return this.CmsService.create(content);
    }

    @Patch(":id/update")
    update(@Param('id') id: string, @Body() content: Partial<Content>) {
        return this.CmsService.update(id, content);
    }

    @Patch(':id/publish')
    toggle_publish(
        @Param('id') id: string,
        @Body() body: { published: boolean; }
    ) {
        return this.CmsService.toggle_publish(id, body.published);
    }
}
