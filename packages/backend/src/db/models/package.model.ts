import { Package, PackageSchema } from '../schemas/package.schema';
import { MongooseModule } from '@nestjs/mongoose';

export const PackageModel = MongooseModule.forFeatureAsync([
  {
    name: Package.name,
    useFactory: () => PackageSchema,
  },
]);
