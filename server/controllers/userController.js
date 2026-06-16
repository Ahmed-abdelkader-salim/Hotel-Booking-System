
export const getUserData = async (req, res) => {
    try {
        const { role, recentSearchedCities } = req.user;
        res.status(200).json({ 
            success: true,
            role, 
            recentSearchedCities 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// store user recent searched cities

export const storeRecentSearchedCities = async(req, res) => {
    try{
        const {recentSearchedCity} = req.body;
        const user = req.user;

        // remove if already exists to avoid duplicates
        user.recentSearchedCities = user.recentSearchedCities.filter(
            city => city !== recentSearchedCity
        );

        if(user.recentSearchedCities.length < 3){
            user.recentSearchedCities.push(recentSearchedCity);
        }else{
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity);
        }

        await user.save();
        res.status(200).json({success:true, message:"Recent searched city stored successfully"})
    }catch(error){
        console.error(error);
        res.status(500).json({success:false, message: error.message})


    }
}