import Log from "../models/Log";


export const getLogs = async (req, res) => {
    const logs = await Log.find().populate("user")
    res.status(200).json(logs);
}
