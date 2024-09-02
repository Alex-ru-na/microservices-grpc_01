import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const PROTO_PATH = __dirname + "/../protos/service.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;

const greeterService = {
  SayHello: (call: any, callback: any) => {
    const reply = { message: `Hello, ${call.request.name}! from her` };
    callback(null, reply);
  },
};

function main() {
  const server = new grpc.Server();
  server.addService(grpcObject.service.Greeter.service, greeterService);
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("Greeter service running on port 50051");
      server.start();
    }
  );
}

main();
