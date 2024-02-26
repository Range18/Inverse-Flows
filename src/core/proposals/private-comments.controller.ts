// TODO
// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Query,
// } from '@nestjs/common';
// import { UpdatePrivateCommentDto } from './dto/update-private-comment.dto';
// import { type UserRequest } from '#src/common/types/user-request.type';
// import { User } from '#src/common/decorators/User.decorator';
// import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
// import {
//   ApiCreatedResponse,
//   ApiHeader,
//   ApiQuery,
//   ApiTags,
// } from '@nestjs/swagger';
// import { GetPrivateCommentRdo } from '#src/core/proposals/rdo/get-private-comment.rdo';
// import { ProposalHistoryService } from '#src/core/history/proposal-history.service';
//
// @ApiTags('Proposals comments')
// @Controller('api/proposals/comments/')
// export class PrivateCommentsController {
//   constructor(private readonly historyService: ProposalHistoryService) {}
//
//   @ApiHeader({
//     name: 'Authorization',
//     required: true,
//     schema: { format: 'Bearer ${AccessToken}' },
//   })
//   @ApiCreatedResponse({ type: [GetPrivateCommentRdo] })
//   @ApiQuery({ name: 'proposalId', type: Number })
//   @AuthGuard()
//   @Get()
//   async findAllForProposal(
//     @Query('proposalId') id: number,
//     @User() user: UserRequest,
//   ) {
//     //TODO
//     const comments = await this.historyService.find({
//       where: { proposal: { id } },
//       relations: { user: { avatar: true, job: true, department: true } },
//     });
//
//     return comments.map((comment) => new GetPrivateCommentRdo(comment));
//   }
//
//   @ApiHeader({
//     name: 'Authorization',
//     required: true,
//     schema: { format: 'Bearer ${AccessToken}' },
//   })
//   @ApiCreatedResponse({ type: GetPrivateCommentRdo })
//   @AuthGuard()
//   @Get(':id')
//   async findOne(@Param('id') id: number, @User() user: UserRequest) {
//     return new GetPrivateCommentRdo(
//       await this.commentsService.findOne({
//         where: { id },
//         relations: { user: { avatar: true } },
//       }),
//     );
//   }
//
//   @ApiHeader({
//     name: 'Authorization',
//     required: true,
//     schema: { format: 'Bearer ${AccessToken}' },
//   })
//   @ApiCreatedResponse({ type: GetPrivateCommentRdo })
//   @AuthGuard()
//   @Patch(':id')
//   async update(
//     @Param('id') id: number,
//     @Body() updateCommentDto: UpdatePrivateCommentDto,
//   ) {
//     return await this.commentsService.updateOne(
//       { where: { id } },
//       updateCommentDto,
//     );
//   }
//
//   @ApiHeader({
//     name: 'Authorization',
//     required: true,
//     schema: { format: 'Bearer ${AccessToken}' },
//   })
//   @ApiCreatedResponse({ type: GetPrivateCommentRdo })
//   @AuthGuard()
//   @Delete(':id')
//   async remove(@Param('id') id: number) {
//     return await this.commentsService.removeOne({ where: { id } });
//   }
// }
