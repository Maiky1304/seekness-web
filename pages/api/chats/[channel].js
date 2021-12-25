import connect from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { channel } = req.query;
  const client = await connect;

  const { transcript } = await client
    .db()
    .collection("tickets")
    .findOne({ channelId: channel });

  res
    .status(200)
    .json(
      transcript
        ? { error: false, content: transcript }
        : { error: true, content: {} }
    );
}
