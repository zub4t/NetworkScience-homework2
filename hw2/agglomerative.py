from operator import truediv
import networkx as nx
import networkx.algorithms.community as nx_comm
import matplotlib.pyplot as plt
G = nx.read_gml("movies/starwars_v.gml")
print("Name of the movie: Star Wars V")
print("Number of nodes: " + str(G.number_of_nodes()))
print("Number of edges: " + str(G.number_of_edges()))
custom_comms = [y for y in range(G.number_of_nodes())]
number_communities = len(custom_comms)

A = nx.to_numpy_matrix(G)

def calculateModularity(custom_comms):
    modularity = 0
    i = 0
    for u in range(G.number_of_nodes()):
        j = 0
        for v in range(G.number_of_nodes()):
            ki = G.degree(list(G.nodes())[u])
            kj = G.degree(list(G.nodes())[v])
            aij = A.item((i, j))
            m = G.number_of_edges()
            modularity = modularity + ((aij - ((ki*kj)/(2*m))) * (1 if custom_comms[u] == custom_comms[v] else 0))
            j = j + 1
        i = i + 1
    modularity = modularity / (2 * G.number_of_edges())
    return modularity

modularityList = []

def agglomerativeGain():
    current_modularity = calculateModularity(custom_comms)
    for x in range(G.number_of_nodes()):
        comm_x = custom_comms[x]
        for c in range(G.number_of_nodes()):
            custom_comms[x] = c
            new_modularity = calculateModularity(custom_comms)
            if(new_modularity > current_modularity):
                comm_x = c
                current_modularity = new_modularity
        modularityList.append(current_modularity)
        custom_comms[x] = comm_x

agglomerativeGain()

for x in range(G.number_of_nodes()):
    print(list(G.nodes())[x] + " - " + str(custom_comms[x]))

for i in range(len(modularityList)):
    plt.plot(i, modularityList[i], "ro")
plt.show()
