import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { UserModule } from '#src/core/users/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '#src/core/assets/multer-config.service';
import { TokenModule } from '#src/core/token/token.module';
import { SessionModule } from '#src/core/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetEntity, UserEntity]),
    UserModule,
    TokenModule,
    SessionModule,
    MulterModule.registerAsync({ useClass: MulterConfigService }),
  ],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
