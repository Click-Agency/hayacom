import { Package, PackageSchema } from '../schemas/Package.schema';
import { MongooseModule } from '@nestjs/mongoose';

export const PackageModel = MongooseModule.forFeatureAsync([
  {
    name: Package.name,
    useFactory: () => PackageSchema,
  },
]);
