import redflags from '../models/redflags';
import moment from 'moment';


//all the redflags
export const getAllIncident = (req, res) => {

    res.send({
        status: 200,
        data: redflags
    });
};

//create redflag or intervantion
export const createIncident = (req, res) => {
    const createRedflag = [{
        id: redflags.length + 1,
        createdOn: moment().format('llll'),
        //createdBy: req.decoded.id,
        createdBy: req.body.createdBy,
        location: req.body.location,
        status: req.body.status,
        images: req.file.path,
        comment: req.body.comment
    }];
    redflags.push(createRedflag);

    res.status(200).json({
        message: 'Created post successfully',
        data: {
            createRedflag
        }
    });
};

//get a post
export const checkIncident = (req, res) => {
    //console.log(req.params);
    const {
        id
    } = req.params.id * 1;
    const isPost = redflags.find(el => el.id === id);
    console.log(isPost);

    if (!isPost) {
        return res.status(401).json({
            message: "Post Not Found!"
        });
    } else {

        res.status(200).json({
            status: 200,
            data: {
                id: isPost

            }
        });
    }
};

//update redflag or post
export const updateIncident = (req, res, next) => {
    //get the id 
    const id = req.params.id * 1;
    console.log(id);
    const updatePost = redflags.find(el => el.id === id);
    if (updatePost) {
        // updatePost.comment = req.body.comment;
        // updatePost.title = req.body.title;
        updatePost.createdBy = req.body.createdBy;
        updatePost.location = req.body.location;
        updatePost.status = req.body.status;
        updatePost.comment = req.body.comment;
        return res.status(201).json({
            message: "successfully updated",
            updatePost: updatePost
        });

    } else {
        res.status(400).json({
            error: "post cannot be updated"
        });

    }

};

//delete redflag or post
export const deleteIncident = (req, res, next) => {
    //look up the post
    //not exist return 404
    const post = redflags.find(c => c.id === parseInt(req.params.id));
    if (!post) return res.status(404).send("redflag not found");
    //delete
    const index = redflags.indexOf(post);
    redflags.splice(index, 1);
    //return the same post
    res.send(post);

};