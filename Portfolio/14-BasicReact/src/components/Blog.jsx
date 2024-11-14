import React from "react";

function Blog(props){
    var imagen= "/images/"+props.info.image;
    return(
        <div>
            <div class="card card-style1 border-0">
                    <div class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                        <div class="row align-items-left">
                            <div class="col-lg-6 mb-4 mb-lg-0">
                                <img src={imagen} alt={props.info.image}/>
                            </div>
                            <div class="col-lg-6 px-xl-10">
                                <div class="d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                    <h3 class="h2 mb-0">Qui-Gon Jinn</h3>
                                    <span class="text-primary">Jedi</span>
                                </div>
                                <div class="d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                    <p>Qui-Gon Jinn, a Force-sensitive human male, was a venerable if maverick Jedi
                                        Master
                                        who lived during the last years of the Republic Era. He was a wise and
                                        well-respected member of the Jedi Order, and was offered a seat on the Jedi
                                        Council,
                                        but chose to reject and follow his own path. Adhering to a philosophy centered
                                        around the Living Force, Jinn strove to follow the will of the Force even when
                                        his
                                        actions conflicted with the wishes of the High Council. After encountering
                                        Anakin
                                        Skywalker, Jinn brought him to the Jedi Temple on Coruscant, convinced he had
                                        found
                                        the Chosen One. His dying wish was for Skywalker to become a Jedi and ultimately
                                        restore balance to the Force.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Blog;