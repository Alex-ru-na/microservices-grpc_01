import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import express from "express";
import { config } from "./common/config/index";

const PROTO_PATH = __dirname + "/../protos/service.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;

const client = new grpcObject.service.Greeter(
  config.greeter_microservice,
  grpc.credentials.createInsecure()
);

const app = express();
const PORT = config.client_port || 3000;

app.get("/sayHello/:name", (req, res) => {
  const name = req.params.name;
  console.log({ her: "we go", name });
  client.SayHello({ name }, (err: any, response: any) => {
    console.log({ err, response });
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Client service running on port ${PORT}`);
});
