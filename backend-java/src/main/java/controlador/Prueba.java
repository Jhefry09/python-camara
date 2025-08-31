package controlador;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import entidades.usuario;
import model.ModelUsuario;

/**
 * Servlet implementation class Prueba
 */
@WebServlet("/login")
public class Prueba extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Prueba() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        // Configuramos la respuesta para que sea de tipo JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Obtenemos los parámetros enviados desde el formulario React
        // (login y pass deben coincidir con los names del frontend)
        String login = request.getParameter("login");
        String pass = request.getParameter("pass");

        // Creamos un objeto del modelo para acceder a la base de datos
        ModelUsuario model = new ModelUsuario();

        // Verificamos si existe el usuario en la BD
        usuario usuario = model.iniciarSesion(login, pass);

        // Usamos Gson para convertir el resultado en JSON
        Gson gson = new Gson();
        String jsonResponse;

        if (usuario != null) {
            // Si el usuario existe, lo devolvemos en formato JSON
            jsonResponse = gson.toJson(usuario);
            System.out.println("inicio de sesion correcto");
        } else {
            // Si no existe, devolvemos un mensaje de error en JSON
            jsonResponse = "{\"error\":\"Usuario o contraseña incorrectos\"}";
        }

        // Escribimos el JSON en la respuesta HTTP para enviarlo al cliente (React)
        response.getWriter().write(jsonResponse);
    }

}
