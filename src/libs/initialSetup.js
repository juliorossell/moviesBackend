import Role from '../models/Role';
import User from '../models/User';
import Movie from '../models/Movie';

export const createInitialData = async () => {

    try {
        const countRoles = await Role.estimatedDocumentCount();
        
        if(countRoles === 0) {
            await createRoles();
        }

        const countUsers = await User.estimatedDocumentCount();
        
        if(countUsers === 0) {
            await createUsers();
        }

        const countMovies = await Movie.estimatedDocumentCount();
        
        if(countMovies === 0) {
            await createMovies();
        }
     
        
      
    } catch (error) {  
        console.log(error);
    }

    
}

const createRoles = async () => {
    const rolesCreated = await Promise.all([
        new Role({ name : 'user'}).save(),
        new Role({ name : 'admin'}).save()
    ]);
    console.log(rolesCreated);
}

const createUsers = async () => {
    const adminUser = new User({
        email : 'admin@ejemplo.poc', 
        password: await User.encryptPassword('admin123'),
    });
    const role = await Role.findOne({name: 'admin'});
    adminUser.roles = [role._id];

    const user = new User({
        email : 'user@lol.com', 
        password: await User.encryptPassword('user'),
    });
    const roleUser = await Role.findOne({name: 'user'});
    user.roles = [roleUser._id];
    const usersCreated = await Promise.all([
        adminUser.save(),
        user.save(),
    ])
    console.log(usersCreated);
}

const createMovies = async () => {
    const moviesCreated = await Promise.all([
        new Movie({ name: "Remember me", category: "Romanticas", imgURL: "https://i.pinimg.com/236x/49/fc/09/49fc098d82c8dfefcb376e7f5d7702d4--hay-album.jpg"}).save(),
        new Movie({ name: "Amor a media noche", category: "Romanticas", imgURL: "https://m.guiadelocio.com/var/guiadelocio.com/storage/images/cine/archivo-peliculas/amor-a-medianoche/35414413-5-esl-ES/amor-a-medianoche.jpg"}).save(),
        new Movie({ name: "Yo antes de ti", category: "Romanticas", imgURL: "https://www.clara.es/medio/2020/05/19/peliculas-romanticas-para-llorar_60885c12_1280x1828.jpg"}).save(),
        new Movie({ name: "Diario de una pasión", category: "Romanticas", imgURL: "https://i.pinimg.com/236x/3e/5b/9d/3e5b9db3a146be1d34a70db6cdcf3c1f--google-search.jpg"}).save(),
        new Movie({ name: "Agua para elefantes", category: "Romanticas", imgURL: "https://assets.afcdn.com/album/D20131219/52-portada-agua-para-elefantes1-989518_H113623_L.jpg"}).save(),
        new Movie({ name: "A dos metros de ti", category: "Romanticas", imgURL: "https://assets.cinepolisklic.com/cmsklicia/movieimages/a-dos-metros-de-ti/poster_resize_192X288.jpg"}).save(),
        new Movie({ name: "Titanic", category: "Romanticas", imgURL: "https://justnovias.files.wordpress.com/2012/07/2731660_249px.jpg"}).save(),
        new Movie({ name: "Nunca es tarde para enamorarse", category: "Romanticas", imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyPKTcHdv-TzRblSZSb3AxPHvv2D1jkkqjNQ&usqp=CAU"}).save(),
        new Movie({ name: "Crepusculo", category: "Romanticas", imgURL: "https://static.diariofemenino.com/pictures/fotos/217000/217872-4.jpg"}).save(),
        new Movie({ name: "Mas alla del cielo", category: "Romanticas", imgURL: "https://i.pinimg.com/236x/0e/09/5f/0e095f64f68f4a7c6cffc09ac954f521--zac-efron-romantic-movies.jpg"}).save(),
    ]);

    console.log(moviesCreated);
}