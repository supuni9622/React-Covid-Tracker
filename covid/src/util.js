export const sortData = (data) => {
    const sortedData = [...data]

    // Longer way
    // sortedData.sort((a,b) => {
    //     if(a.cases > b.cases){
    //         // -1 similar to false
    //         return -1;
    //     }else{
    //         // similar to true
    //         return 1
    //     }
    // })
    // return sortedData;

    // Shortest way 
     return sortedData.sort((a,b) => a.cases > b.cases ? -1 : 1);
}